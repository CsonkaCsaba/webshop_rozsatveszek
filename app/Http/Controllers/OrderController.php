<?php

namespace App\Http\Controllers;

use App\Models\Cim;
use App\Models\Ceg;
use App\Models\Vasarlo;
use App\Models\Rendeles;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function show(Rendeles $rendeles)
    {
        $query = Rendeles::query()->with(['vasarlo'])->with(['termek'])->orderBy('id', 'desc')->get();
        return response()->json($query);

    
    }

    public function storeOrder(Request $request){

        //Billing Address
        $szamlazasiCim = Cim::updateOrcreate(
            ['iranyitoszam' => $request->billingAddress['zipCode'],
             'telepules' => $request->billingAddress['city'],
             'utca' => $request->billingAddress['street'],
             'hazszam' => $request->billingAddress['house']],
            ['iranyitoszam' => $request->billingAddress['zipCode'],
            'telepules' => $request->billingAddress['city'],
            'utca' => $request->billingAddress['street'],
            'hazszam' => $request->billingAddress['house']]
        );
        $billAddress = $szamlazasiCim->id;

        //Customer
        //If email address exists in Vasarlo, then data are updated (not logged in), else new vasarlo is created
        $vasarlo = Vasarlo::updateOrcreate(
            ['email' => $request->billingAddress['email'],
            'nev' => $request->billingAddress['name'],
            'email' => $request->billingAddress['email'],
            'telefonszam' => $request->billingAddress['phone']],
            [   
            'nev' => $request->billingAddress['name'],
            'email' => $request->billingAddress['email'],
            'telefonszam' => $request->billingAddress['phone'],
            ]);    
        $vasarloId = $vasarlo->id;
        $vasarlo->cim()->attach($billAddress, ['szamlazasi' => 1]);

        //Company
        if($request->billingAddress['taxNumber'] != ''){
            $ceg = Ceg::UpdateOrcreate(
                ['cegnev' => $request->billingAddress['name'],
                 'adoszam' => $request->billingAddress['taxNumber'],
                 'cimId' => $billAddress],
                ['cegnev' => $request->billingAddress['name'],
                 'adoszam' => $request->billingAddress['taxNumber'],
                 'cimId' => $billAddress]
            );
            $cegId = $ceg->id;
            $vasarlo->update(['cegId' => $cegId]); //Vasarlo cegId field is updated
        };

        //Shipping Address
        //If it differs from billing address
        if ($request->shippingAddress['new'] == 'yes'){
            $szallitasiCim = Cim::create([
                'iranyitoszam' => $request->shippingAddress['zipCode'],
                'telepules' => $request->shippingAddress['city'],
                'utca' => $request->shippingAddress['street'],
                'hazszam' => $request->shippingAddress['house'],
            ]);
        $shipAddress = $szallitasiCim->id;
        $vasarlo->cim()->attach($shipAddress, ['szallitasi' => 1]);
        };

        //Order
        $fizetes = ($request->payment == 'delivery') ? 'Utánvét' : 'Előre utalás';
        $allapot = ($request->payment == 'delivery') ? 'Feldolgozás alatt' : 'Utalás ellenőrzése';
        $cegnek = ($request->billingAddress['company'] == 'yes') ? 1 : 0;

        $rendeles = Rendeles::create([
            'megjegyzes' => $request->comments,
            'fizetesiMod' => $fizetes,
            'ceges' => $cegnek,
            'allapot' => $allapot,
            'vegosszeg' => $request->vegosszeg,
            'fk_vasarloId' => $vasarloId
        ]);

        foreach ($request->items as $product){
            $rendeles->termek()->attach($product['id'], ['mennyiseg' => $product['quantity']]);
        }
    }

    public function update(Request $request, $id)
    {
        $order = Rendeles::find($id);
        $order->allapot = $request->allapot;
        $order->save();

    }
}

?>