<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StayController;

// Main page
Route::get('/', fn () => view('index'))->middleware('auth');
// Auth stuff
Auth::routes();





// Overwrite the register routes
// Route::get('/register', 'Auth\RegisterController@showRegistrationForm')->name('register')->middleware('auth');
Route::post('/register', 'Auth\RegisterController@register');





// Logins
Route::get('/home', 'HomeController@index')->name('home');
// Generic pages
$where = ['url' => 'reserveringen|dieren|eigenaren|groentes|hokken|vandaag|soorten|statussen|gebruikers'];
Route::get('/{url}', fn ($url) => view('index'))
    ->where($where)->middleware('auth');
Route::get('/{url}/{aylmao}', fn ($url) => view('index'))
    ->where($where)->middleware('auth');
Route::get('/{url}/{a}/{b}', fn ($url) => view('index'))
    ->where($where)->middleware('auth');
// Custom Api Routes
Route::post('/api/reserveringen/today', [StayController::class, 'today'])->middleware('auth');
// Api Routes
Route::resource('/api/groentes', 'VegetableController')->middleware('auth');
Route::resource('/api/reserveringen', 'StayController')->middleware('auth');
Route::resource('/api/statussen', 'StatusController')->middleware('auth');
Route::resource('/api/eigenaren', 'OwnerController')->middleware('auth');
Route::resource('/api/gebruikers', 'UserController')->middleware('auth');
Route::resource('/api/soorten', 'SpeciesController')->middleware('auth');
Route::resource('/api/dieren', 'AnimalController')->middleware('auth');
Route::resource('/api/hokken', 'CageController')->middleware('auth');

// 404
// Route::fallback(fn () => view('pebbis'));
