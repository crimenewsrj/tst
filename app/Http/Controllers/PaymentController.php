<?php namespace App\Http\Controllers;

use App\User;
use Auth;
use App\Payments;
use App\PaymentsProviders;
use App\Filter;
use App\Exchanges;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use DB;

class PaymentController extends Controller
{
    private $paymentsProviders;

    public function __construct(PaymentsProviders $paymentsProviders)
    {
        $this->paymentsProviders = $paymentsProviders;
    }

    /**
     * IPN | Return of payments providers, auto-detect and run private function.
     *
     * @param Request $r
     * @return \Illuminate\Http\JsonResponse
     */
    public function return(Request $r)
    {
      
        $postFields = $r->post();

        if(isset($postFields['requestBody'])) {
            return $this->EzBank_return($postFields);
        }

        return response()->json(['status' => 'false', 'error' => 'Provider not identified, please, contact the admin!']);
    }

    private function EzBank_return(array $params)
    {
        // Identifier of payment
        $paymentID = $params['requestBody']['transactionId'] ?? NULL; //$r->post('data')['id'] ?? NULL;

        // Validate
        if ($paymentID == NULL) {
            return response()->json(['status' => 'false', 'error' => 'Missing ID of payment!']);
        }

        // Search this payment in history orders
        $payment = Payments::where('order_id', $paymentID)->first();

        if (!isset($payment)) return response()->json(['status' => 'false', 'error' => 'This order not exist!']);
        if ($payment->status === 1) return response()->json(['status' => 'false', 'error' => 'This order already is paid!']);


        // Get user of this Order
        $user = User::where('id', $payment->user_id)->first();

       $depositValeu = $payment->sum;

        if ($params['requestBody']['transactionType'] == 'RECEIVEPIX') // pending | approved
        {
            // Update status of this payment order
            Payments::where('order_id', $paymentID)->update([
                'status' => 1
            ]);

            // Update new balance of User
            User::where('id', $payment->user_id)->update([
                'balance' => $user->balance + $depositValeu
            ]);

            // Deposit reward for Ref account
            if ($user->ref_id != NULL) {
                // Search account of this Ref
                $userRef = User::where('unique_id', $user->ref_id)->first();

                // Get count order of guest account
                $paymentCount = Payments::where('user_id', $user->id)->where('status', 1)->count();

                // Check if is first deposit
                if ($paymentCount == 1) {   
                    $recompesa =  (float)env('RECOMPESA_DE_AFILIADOS');
                    $valor = $recompesa;
                    $userRef->ref_money_all += $valor; // 10 BRL
                    $userRef->ref_money += $valor; // 10 BRL
                    $userRef->save();
                }
            }
            ////////

            return response()->json(['status' => 'true', 'msg' => 'Success!']);
        } else {
            return response()->json(['status' => 'false', 'error' => 'This payment is not Approved, try again later!']);
        }
    }

}
