<?php

namespace App\Http\Controllers;

use App\Models\Cim;
use App\Models\Ceg;
use App\Models\Vasarlo;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function storeOrder(Request $request){

        //Billing Address
        $szamlazasiCim = Cim::create([
            'iranyitoszam' => $request->billingAddress['zipCode'],
            'telepules' => $request->billingAddress['city'],
            'utca' => $request->billingAddress['street'],
            'hazszam' => $request->billingAddress['house'],
        ]);
        $billAddress = $szamlazasiCim->id;

        //Customer
        //If email address exists in Vasarlo, then data are updated (not logged in), else new vasarlo is created
        // $vasarlo = Vasarlo::updateOrcreate(
        //     ['email' => $request->billingAddress['email']],
        //     [   
        //         'nev' => $request->billingAddress['name'],
        //         'email' => $request->billingAddress['email'],
        //         'telefonszam' => $request->billingAddress['phone'],
        //     ]);
        
        $vasarlo = Vasarlo::create([   
            'nev' => $request->billingAddress['name'],
            'email' => $request->billingAddress['email'],
            'telefonszam' => $request->billingAddress['phone'],
        ]);
        $vasarloId = $vasarlo->id;
        $vasarlo->cim()->attach($billAddress, ['szamlazasi' => 1]);

        //Company
        if($request->billingAddress['taxNumber'] != ''){
            $ceg = Ceg::create([
                'cegnev' => $request->billingAddress['name'],
                'adoszam' => $request->billingAddress['taxNumber'],
                'cimId' => $billAddress,
            ]);
            $cegId = $ceg->id;
            $vasarlo->update(['cegId' => $cegId]); //Vasarlo cegId field is updated
        };

        //Shipping Addres
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
        }


        
    }
}

?>