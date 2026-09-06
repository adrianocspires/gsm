<?php

namespace GSMSuite\CoreGuard;

use Illuminate\Support\ServiceProvider;
use GSMSuite\CoreGuard\Middleware\SystemGuard;

class GSMSuiteServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $router = $this->app['router'];

        $router->pushMiddlewareToGroup('web', SystemGuard::class);
        $router->pushMiddlewareToGroup('api', SystemGuard::class);
    }
}
