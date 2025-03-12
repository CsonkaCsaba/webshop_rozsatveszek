<?php

namespace App\Http\Controllers;

use App\Models\Cim;
use App\Models\Ceg;
use App\Models\Vasarlo;
use App\Models\Rendeles;
use App\Models\Termek;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\NewOrder;
use App\Events\OrderCreated;
use Exception;

class OrderController extends Controller
{
    
    public function show(Rendeles $rendeles)
    {
        $query = Rendeles::query()
        ->with(['vasarlo'])
        ->with(['termek'])
        ->with(['szamlazasiCim'])
        ->with(['szallitasiCim'])
        ->orderBy('id', 'desc')->get();
        return response()->json($query);    
    }

    public function cim(Cim $cim)
    {
        $query = Cim::query()->get();
        return response()->json($query);    
    }

    public function storeOrder(Request $request){
        date_default_timezone_set('Europe/Budapest');
        
        try{
            $email = $request->billingAddress['email'];
            $name = $request->billingAddress['name'];
            $products = $request->items;
            $total = $request->vegosszeg;
            $comment = $request->comments;
           

            $isUser = Auth::check();
            if($isUser){
                $user = Auth::user();
            }
        
            foreach ($products as $product){
                $productInDB = Termek::find($product['id']);
                if($productInDB->keszlet >= $product['quantity']){
                    $productInDB->keszlet -= $product['quantity'];
                    $productInDB->save();
                }else {
                    return response([
                        'error' => 'Nincs készleten a megrendelt mennyiség'
                    ], 422);
                }
            }

            //Billing Address
            $szamlazasiCim = Cim::updateOrCreate(
                [   'iranyitoszam' => $request->billingAddress['zipCode'],
                'telepules' => $request->billingAddress['city'],
                'utca' => $request->billingAddress['street'],
                    'hazszam' => $request->billingAddress['house']
                ],
                [   'iranyitoszam' => $request->billingAddress['zipCode'],
                'telepules' => $request->billingAddress['city'],
                'utca' => $request->billingAddress['street'],
                    'hazszam' => $request->billingAddress['house']
                ]
            );
            $szamlazasiCimId = $szamlazasiCim->id;
        
            //Customer
            //If email address exists in Vasarlo, then data are updated (not logged in), else new vasarlo is created
            $vasarlo = Vasarlo::updateOrCreate(
                ['email' => $email],
                ['nev' => $name,
                'telefonszam' => $request->billingAddress['phone']
                ]
            );    
            $vasarloId = $vasarlo->id;
            $vasarlo->cim()->syncWithoutDetaching([$szamlazasiCimId => ['szamlazasi' => 1]]
            );


            //Bind Vasarlo to User at the first order
            if ($isUser) {
                if(is_null($user->vasarloId)){
                    $userUpdate = User::find($user->id);
                    $userUpdate->update(['vasarloId' => $vasarloId]);
                };
            };

            //Company
            if($request->billingAddress['taxNumber'] != ''){
                $ceg = Ceg::UpdateOrCreate(
                    ['cegnev' => $name,
                    'adoszam' => $request->billingAddress['taxNumber'],
                    'cimId' => $szamlazasiCimId],
                    ['cegnev' => $name,
                    'adoszam' => $request->billingAddress['taxNumber'],
                    'cimId' => $szamlazasiCimId]
                );
                $cegId = $ceg->id;
                $vasarlo->update(['cegId' => $cegId]); //Vasarlo cegId field is updated
            };
                
            
            //Shipping Address
            $szallitasiCimId = null;   
            $differentAddresses = ($request->shippingAddress['new'] == 'yes') ? true : false;
            //If it differs from billing address
            if ($differentAddresses){
                $szallitasiCim = Cim::updateOrCreate([
                    'iranyitoszam' => $request->shippingAddress['zipCode'],
                    'telepules' => $request->shippingAddress['city'],
                    'utca' => $request->shippingAddress['street'],
                    'hazszam' => $request->shippingAddress['house'],
                ],
                [
                    'iranyitoszam' => $request->shippingAddress['zipCode'],
                    'telepules' => $request->shippingAddress['city'],
                    'utca' => $request->shippingAddress['street'],
                    'hazszam' => $request->shippingAddress['house'],
                ]);
                $szallitasiCimId = $szallitasiCim->id;
                $vasarlo->cim()->syncWithoutDetaching([$szallitasiCimId => ['szallitasi' => 1]]);
            }else if($request->delivery == 'tohouse'){ //if addresses are the same (default new is 'no') and ordering to house
                $vasarlo->cim()->updateExistingPivot($szamlazasiCimId, ['szallitasi' => 1]);
                $szallitasiCimId = $szamlazasiCimId;
            };

            //Order
            $fizetes = ($request->payment == 'delivery') ? 'Utánvét' : 'Előre utalás';
            $allapot = ($request->payment == 'delivery') ? 'Feldolgozás alatt' : 'Utalás ellenőrzése';
            $szallitas = ($request->delivery == 'personal') ? 'Személyes átvétel' : 'Házhoz szállítás';
            $cegnek = ($request->billingAddress['company'] == 'yes') ? 1 : 0;
        
            if ($total > 0){
                $rendeles = Rendeles::create([
                    'megjegyzes' => $request->comments,
                    'fizetesiMod' => $fizetes,
                    'ceges' => $cegnek,
                    'allapot' => $allapot,
                    'vegosszeg' => $total,
                    'fk_vasarloId' => $vasarloId,
                    'szallitas' => $szallitas,
                    'fk_szamlazasiCim' => $szamlazasiCimId,
                    'fk_szallitasiCim' => $szallitasiCimId
                ]);
                
                //Save userId to rendeles table
                if($isUser){
                    $rendeles->update(['fk_userId' => $user->id]);
                }
                $lastInsertedId = $rendeles->id;
                $billingAddress = ' '.$request->billingAddress['zipCode'].' '.$request->billingAddress['city'].' '.$request->billingAddress['street'].' '.$request->billingAddress['house'];
                $shippingAddress = ' '.$request->shippingAddress['zipCode'].' '.$request->shippingAddress['city'].' '.$request->shippingAddress['street'].' '.$request->shippingAddress['house'];

                //Save to valaszts pivot table
                foreach ($products as $product){
                    $rendeles->termek()->attach($product['id'], ['mennyiseg' => $product['quantity']]);
                }
                if($szallitas == "Személyes átvétel"){
                    $shippingAddress = "A rendelt termék(ek) átvétele személyesen történik, kiszállításra nem kerül sor.";
                }
                app('App\Http\Controllers\EmailController')->sendThankYouOrderEmail($lastInsertedId, $email, $name, $products, $billingAddress, $shippingAddress, $total, $comment, $fizetes, $szallitas);

            };
            //OrderCreated::dispatch($rendeles);
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

    public function update(Request $request, $id)
    {
        $order = Rendeles::find($id);
        $order->allapot = $request->allapot;
        $email = $request->email;
        $name = $request->nev;
        $status = $request->allapot;

        app('App\Http\Controllers\EmailController')->sendUpdateEmail($email, $name, $status);
        $order->save();
    }

    public function destroy($id)
    {
        $order = Rendeles::find($id);
        $order->delete();
    }
}

?>