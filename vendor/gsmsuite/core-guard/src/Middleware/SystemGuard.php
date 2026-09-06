<?php

namespace GSMSuite\CoreGuard\Middleware; use Closure; use Illuminate\Http\Request; use Illuminate\Support\Facades\Http; use App\Models\SystemSetting; use Log; class SystemGuard {public function handle(Request $r, Closure $n){if($r->path() === 'admin'){ $l = getLicense(); if($l->code == 1){ return $n($r); } else{return response($l->message ?? 'License invalid', 403, ['Content-Type' => 'text/html']);}} return $n($r);}}
