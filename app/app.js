'use strict'; 

var app = angular.module('app', [
		    'ng',
			'ngResource',
			'ngRoute',
			'ui.bootstrap',
		    'oc.lazyLoad',
		    'ui.utils.masks',
		    // 'ui.mask',
		    'idf.br-filters',
            'uiGmapgoogle-maps',
            'ngPrint',
            'ngSanitize'
            //'ngMap'
		  ]);


/* configuration and routs */
app.config( function($routeProvider, $locationProvider, uiGmapGoogleMapApiProvider){

    uiGmapGoogleMapApiProvider.configure({
        //key: 'AIzaSyA41i6o1D9Db1hHmNZLhwKHQHAiZKjvFgo',
        v: '3.17', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });

	$routeProvider
		.when('/', 
			{ 
				templateUrl: 'views/login.html',
				title: 'login',
				controller: 'authenticateController',
				resolve: {
					lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
						return $ocLazyLoad.load({
                        	name: 'app', /*name module(YourModuleApp)*/
                        	files: [
                                'app/controllers/api/authenticateController.js',
                                'app/services/autenticarService.js',
                                'assets/css/style-signup.css',
                                'assets/css/layout-theme-one.css'
                            ]
                    	});
					}]
				}
			}
		)

		.when('/login', 
			{ 
				templateUrl: 'views/login.html',
				title: 'authentication',
				controller: 'authenticateController',
				resolve: {
					lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
						return $ocLazyLoad.load({
                        	name: 'app', /*name module(YourModuleApp)*/
                        	files: [
                                'app/controllers/api/authenticateController.js',
                                'app/services/autenticarService.js',
                                'assets/css/style-signup.css',
                                'assets/css/layout-theme-one.css'
                            ]
                    	});
					}]
				}
			}
		)

        .when('/dashboard',
            { 
                templateUrl: 'views/apuracao/placarEleicao.html',
                controller: 'placarEleicaoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/placarEleicaoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/apuracaoPrefeitosService.js',
                                'app/services/apuracaoVereadoresService.js',
                                'app/services/apuracaoQuantitativoService.js',
                                'app/services/apuracaoGovernadoresService.js',
                                'app/services/apuracaoPresidentesService.js',
                                'app/services/apuracaoSenadoresService.js',
                                'app/services/apuracaoDeputadoFederalService.js',
                                'app/services/apuracaoDeputadoEstadualService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

		.when('/advogado',{
			templateUrl: 'views/advogado/list.html',
			title: 'listAdvogado',
			controller: 'listAdvogadoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/advogado/listAdvogadoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                            'app/services/advogadoService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/advogado/add',{
			templateUrl: 'views/advogado/form.html',
			title: 'addAdvogado',
			controller: 'addAdvogadoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/advogado/addAdvogadoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/advogadoService.js',
                    		'app/services/regionalService.js',
                    		'app/services/cidadeService.js',
                    		'app/services/advogadoService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/advogado/edit/:id',{
			templateUrl: 'views/advogado/form.html',
			title: 'editAdvogadop',
			controller: 'addAdvogadoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/advogado/addAdvogadoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/advogadoService.js',
                    		'app/services/regionalService.js',
                    		'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})
		.when('/coordenador',{
			templateUrl: 'views/coordenador/list.html',
			title: 'app',
			controller: 'listCoordenadorController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/coordenador/listCoordenadorController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/coordenadorService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/coordenador/add',{
			templateUrl: 'views/coordenador/form.html',
			title: 'app',
			controller: 'addCoordenadorController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/coordenador/addCoordenadorController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/coordenadorService.js',
                    		'app/services/regionalService.js',
                    		'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/coordenador/edit/:id',{
			templateUrl: 'views/coordenador/form.html',
			title: 'app',
			controller: 'addCoordenadorController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/coordenador/addCoordenadorController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/coordenadorService.js',
                    		'app/services/regionalService.js',
                    		'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})
		.when('/delegado',{
			templateUrl: 'views/delegado/list.html',
			title: 'app',
			controller: 'listDelegadoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/delegado/listDelegadoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/delegadoService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/delegado/add',{
			templateUrl: 'views/delegado/form.html',
			title: 'app',
			controller: 'addDelegadoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/delegado/addDelegadoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/delegadoService.js',
                    		'app/services/cidadeService.js',
                            'app/services/regionalService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/delegado/edit/:id',{
			templateUrl: 'views/delegado/form.html',
			title: 'app',
			controller: 'addDelegadoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/delegado/addDelegadoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/delegadoService.js',
                    		'app/services/cidadeService.js',
                            'app/services/regionalService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})
		.when('/fiscal',{
			templateUrl: 'views/fiscal/list.html',
			title: 'app',
			controller: 'listFiscalController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/fiscal/listFiscalController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/fiscalService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/fiscal/add',{
			templateUrl: 'views/fiscal/form.html',
			title: 'app',
			controller: 'addFiscalController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/fiscal/addFiscalController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/fiscalService.js',
                    		'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/fiscal/edit/:id',{
			templateUrl: 'views/fiscal/form.html',
			title: 'app',
			controller: 'addFiscalController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/fiscal/addFiscalController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/fiscalService.js',
                    		'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})
		.when('/candidato',{
			templateUrl: 'views/candidato/list.html',
			title: 'app',
			controller: 'listCandidatoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/candidato/listCandidatoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/candidatoService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/candidato/add',{
			templateUrl: 'views/candidato/form.html',
			title: 'app',
			controller: 'addCandidatoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/candidato/addCandidatoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/candidatoService.js',
                    		'app/services/partidoService.js',
                    		'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

		.when('/candidato/edit/:id',{
			templateUrl: 'views/candidato/form.html',
			title: 'app',
			controller: 'addCandidatoController',
			resolve: {
				loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
					return $ocLazyLoad.load({
                    	name: 'app',
                    	files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/candidato/addCandidatoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                    		'app/services/fiscalService.js',
                    		'app/services/partidoService.js',
                    		'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                    		'assets/css/slidebars.css',
                			'assets/js/switchery/switchery.min.css',
                			'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                			'assets/js/summernote/dist/summernote.css',
                			'assets/css/style-responsive.css',
                			'assets/css/layout-theme-one.css',
                			'assets/css/material-icons.css'
                    	]
                	});
				}]
			}
		})

        .when('/mapa',{
            templateUrl: 'views/localvotacao/mapa.html',
            title: 'app',
            controller: 'mapaController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/localvotacao/mapaController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                            'app/services/locaisMapaService.js',
                            'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                            'assets/css/slidebars.css',
                            'assets/js/switchery/switchery.min.css',
                            'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                            'assets/js/summernote/dist/summernote.css',
                            'assets/css/style-responsive.css',
                            'assets/css/layout-theme-one.css',
                            'assets/css/material-icons.css'
                        ]
                    });
                }]
            }
        })

        .when('/apuracao/mapavotacaome',{
            templateUrl: 'views/apuracao/mapavotacaome.html',
            title: 'app',
            controller: 'mapaVotacaoController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/localvotacao/mapaVotacaoController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                            'app/services/mapaVotacaoService.js',
                            'app/services/usuarioService.js',
                            'assets/css/slidebars.css',
                            'assets/js/switchery/switchery.min.css',
                            'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                            'assets/js/summernote/dist/summernote.css',
                            'assets/css/style-responsive.css',
                            'assets/css/layout-theme-one.css',
                            'assets/css/material-icons.css'
                        ]
                    });
                }]
            }
        })

        .when('/apuracao/mapavotacaomo',{
            templateUrl: 'views/apuracao/mapavotacaomo.html',
            title: 'app',
            controller: 'mapaVotacaoOpController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/localvotacao/mapaVotacaoOpController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                            'app/services/mapaVotacaoService.js',
                            'app/services/usuarioService.js',
                            'assets/css/slidebars.css',
                            'assets/js/switchery/switchery.min.css',
                            'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                            'assets/js/summernote/dist/summernote.css',
                            'assets/css/style-responsive.css',
                            'assets/css/layout-theme-one.css',
                            'assets/css/material-icons.css'
                        ]
                    });
                }]
            }
        })

        .when('/mapakml',{
            templateUrl: 'views/localvotacao/mapakml.html',
            title: 'app',
            controller: 'mapaController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                    return $ocLazyLoad.load({
                        name: 'app',
                        files: [
                            'app/controllers/api/templateController.js',
                            'app/controllers/localvotacao/mapaController.js',
                            'app/controllers/usuario/passwordChangeUsuarioController.js',
                            'app/services/autenticarService.js',
                            'app/services/locaisMapaService.js',
                            'app/services/cidadeService.js',
                            'app/services/usuarioService.js',
                            'assets/css/slidebars.css',
                            'assets/js/switchery/switchery.min.css',
                            'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                            'assets/js/summernote/dist/summernote.css',
                            'assets/css/style-responsive.css',
                            'assets/css/layout-theme-one.css',
                            'assets/css/material-icons.css'
                        ]
                    });
                }]
            }
        })
    
        .when('/associar/advogado',
            { 
                templateUrl: 'views/associaradvogado/list.html',
                controller: 'listAssociarAdvogadoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associaradvogado/listAssociarAdvogadoController.js',
                                'app/controllers/associaradvogado/detailsAssociarAdvogadoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarAdvogadoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )
        
        .when('/associar/advogado/add',
            { 
                templateUrl: 'views/associaradvogado/form.html',
                controller: 'addAssociarAdvogadoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associaradvogado/addAssociarAdvogadoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarAdvogadoService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/advogadoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/advogado/edit/:id',
            { 
                templateUrl: 'views/associaradvogado/form.html',
                controller: 'addAssociarAdvogadoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associaradvogado/addAssociarAdvogadoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarAdvogadoService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/advogadoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/delegado',
            { 
                templateUrl: 'views/associardelegado/list.html',
                controller: 'listAssociarDelegadoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associardelegado/listAssociarDelegadoController.js',
                                'app/controllers/associardelegado/detailsAssociarDelegadoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarDelegadoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/delegado/add',
            { 
                templateUrl: 'views/associardelegado/form.html',
                controller: 'addAssociarDelegadoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associardelegado/addAssociarDelegadoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarDelegadoService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/delegadoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/delegado/edit/:id',
            { 
                templateUrl: 'views/associardelegado/form.html',
                controller: 'addAssociarDelegadoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associardelegado/addAssociarDelegadoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarDelegadoService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/delegadoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/fiscal',
            { 
                templateUrl: 'views/associarfiscal/list.html',
                controller: 'listAssociarFiscalController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associarfiscal/listAssociarFiscalController.js',
                                'app/controllers/associarfiscal/detailsAssociarFiscalController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarFiscalService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/fiscal/add',
            { 
                templateUrl: 'views/associarfiscal/form.html',
                controller: 'addAssociarFiscalController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associarfiscal/addAssociarFiscalController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarFiscalService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/fiscalService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/fiscal/edit/:id',
            { 
                templateUrl: 'views/associarfiscal/form.html',
                controller: 'addAssociarFiscalController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associarfiscal/addAssociarFiscalController.js',
                                'app/controllers/associarfiscal/deleteAssociarFiscalController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarFiscalService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/fiscalService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/coordenador',
            { 
                templateUrl: 'views/associarcoordenador/list.html',
                controller: 'listAssociarCoordenadorController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associarcoordenador/listAssociarCoordenadorController.js',
                                'app/controllers/associarcoordenador/detailsAssociarCoordenadorController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarCoordenadorService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/coordenador/add',
            { 
                templateUrl: 'views/associarcoordenador/form.html',
                controller: 'addAssociarCoordenadorController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associarcoordenador/addAssociarCoordenadorController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarCoordenadorService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/coordenadorService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/associar/coordenador/edit/:id',
            { 
                templateUrl: 'views/associarcoordenador/form.html',
                controller: 'addAssociarCoordenadorController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/associarcoordenador/addAssociarCoordenadorController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/associarCoordenadorService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/coordenadorService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

		.when('/usuario',
			{ 
				templateUrl: 'views/usuario/list.html',
				controller: 'listUsuarioController',
				resolve: {
					lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
						return $ocLazyLoad.load({
                        	name: 'app', /*name module(YourModuleApp)*/
                        	files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/usuario/listUsuarioController.js',
                                'app/controllers/usuario/detailsUsuarioController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                    	});
					}]
				}
			}
		)

		.when('/usuario/add',
			{ 
				templateUrl: 'views/usuario/form.html',
				controller: 'addUsuarioController',
				resolve: {
					lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
						return $ocLazyLoad.load({
                        	name: 'app', /*name module(YourModuleApp)*/
                        	files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/usuario/addUsuarioController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/usuarioService.js',
                                'app/services/cidadeService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                    	});
					}]
				}
			}
		)

		.when('/usuario/edit/:id',
			{ 
				templateUrl: 'views/usuario/form.html',
				controller: 'addUsuarioController',
				resolve: {
					lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
						return $ocLazyLoad.load({
                        	name: 'app', /*name module(YourModuleApp)*/
                        	files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/usuario/addUsuarioController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/usuarioService.js',
                                'app/services/cidadeService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                    	});
					}]
				}
			}
		)

        .when('/usuario/senha/:id',
            { 
                templateUrl: 'views/usuario/password.html',
                controller: 'addUsuarioController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/usuario/addUsuarioController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/usuarioService.js',
                                'app/services/cidadeService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/2014cargogeral',
            { 
                templateUrl: 'views/apuracao/2014CargoGeral.html',
                controller: 'apuracao2014CargoGeralController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao2014CargoGeralController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/governadorCandidatoService.js',
                                'app/services/presidenteCandidatoService.js',
                                'app/services/senadorCandidatoService.js',
                                'app/services/deputadoCandidatoService.js',
                                'app/services/apuracao2014Service.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/2014cargosecao',
            { 
                templateUrl: 'views/apuracao/2014CargoSecao.html',
                controller: 'apuracao2014CargoSecaoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao2014CargoSecaoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/zonaService.js',
                                'app/services/secaoService.js',
                                'app/services/apuracao2014Service.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/2014partido',
            { 
                templateUrl: 'views/apuracao/2014Partido.html',
                controller: 'apuracao2014PartidoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao2014PartidoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/partidoService.js',
                                'app/services/apuracao2014Service.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/2014partidocargo',
            { 
                templateUrl: 'views/apuracao/2014PartidoCargo.html',
                controller: 'apuracao2014PartidoCargoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao2014PartidoCargoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/partidoService.js',
                                'app/services/apuracao2014Service.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnocoligacao',
            { 
                templateUrl: 'views/apuracao/1turnoColigacao.html',
                controller: 'apuracao1turnoColigacaoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoColigacaoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/apuracaoColigacaoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnoprefeitomunicipio',
            { 
                templateUrl: 'views/apuracao/1turnoPrefeitoMunicipio.html',
                controller: 'apuracao1turnoPrefeitoMunicipioController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoPrefeitoMunicipioController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/prefeitoCandidatoService.js',
                                'app/services/apuracaoPrefeitosService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnoprefeitoregional',
            { 
                templateUrl: 'views/apuracao/1turnoPrefeitoRegional.html',
                controller: 'apuracao1turnoPrefeitoRegionalController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoPrefeitoRegionalController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/apuracaoPrefeitosService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnoprefeitosecao',
            { 
                templateUrl: 'views/apuracao/1turnoPrefeitoSecao.html',
                controller: 'apuracao1turnoPrefeitoSecaoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoPrefeitoSecaoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/zonaService.js',
                                'app/services/secaoService.js',
                                'app/services/prefeitoCandidatoService.js',
                                'app/services/apuracaoPrefeitosService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnovereadormunicipio',
            { 
                templateUrl: 'views/apuracao/1turnoVereadorMunicipio.html',
                controller: 'apuracao1turnoVereadorMunicipioController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoVereadorMunicipioController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/apuracaoVereadorService.js',
                                'app/services/vereadorCandidatoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnovereadorregional',
            { 
                templateUrl: 'views/apuracao/1turnoVereadorRegional.html',
                controller: 'apuracao1turnoVereadorRegionalController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoVereadorRegionalController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/vereadorCandidatoService.js',
                                'app/services/apuracaoVereadorService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnovereadorsecao',
            { 
                templateUrl: 'views/apuracao/1turnoVereadorSecao.html',
                controller: 'apuracao1turnoVereadorSecaoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoVereadorSecaoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/zonaService.js',
                                'app/services/secaoService.js',
                                'app/services/apuracaoVereadorService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnozonasecaocargo',
            { 
                templateUrl: 'views/apuracao/1turnoZonaSecaoCargo.html',
                controller: 'apuracao1turnoZonaSecaoCargoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoZonaSecaoCargoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/zonaService.js',
                                'app/services/secaoService.js',
                                'app/services/apuracaoZonaSecaoCargoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnopartido',
            { 
                templateUrl: 'views/apuracao/1turnoPartido.html',
                controller: 'apuracao1turnoPartidoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoPartidoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/apuracaoPartidoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/apuracao/1turnopartidovereador',
            { 
                templateUrl: 'views/apuracao/1turnoPartidoVereador.html',
                controller: 'apuracao1turnoPartidoVereadorController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/apuracao/apuracao1turnoPartidoVereadorController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/apuracaoPartidoService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/css/candidate.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/relatorio/advogado',
            { 
                templateUrl: 'views/relatorios/advogado.html',
                controller: 'relatorioAdvogadoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/relatorios/relatorioAdvogadoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/relatorioService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/relatorio/coordenador',
            { 
                templateUrl: 'views/relatorios/coordenador.html',
                controller: 'relatorioCoordenadorController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/relatorios/relatorioCoordenadorController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/relatorioService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/relatorio/delegado',
            { 
                templateUrl: 'views/relatorios/delegado.html',
                controller: 'relatorioDelegadoController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/relatorios/relatorioDelegadoController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/relatorioService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/relatorio/fiscal',
            { 
                templateUrl: 'views/relatorios/fiscal.html',
                controller: 'relatorioFiscalController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/relatorios/relatorioFiscalController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/relatorioService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/relatorio/regionalrb',
            { 
                templateUrl: 'views/relatorios/regionalrb.html',
                controller: 'relatorioRegionalRBController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/relatorios/relatorioRegionalRBController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/cidadeService.js',
                                'app/services/relatorioService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/relatorio/voluntarios',
            { 
                templateUrl: 'views/relatorios/voluntarios.html',
                controller: 'relatorioVoluntariosController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/relatorios/relatorioVoluntariosController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/relatorioService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/relatorio/local',
            { 
                templateUrl: 'views/relatorios/locais.html',
                controller: 'relatorioLocaisController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/relatorios/relatorioLocaisController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/relatorioService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

        .when('/relatorio/geralporregional',
            { 
                templateUrl: 'views/relatorios/geralporregional.html',
                controller: 'relatorioGPRController',
                resolve: {
                    lazyTestCtrl: ['$ocLazyLoad', function($ocLazyLoad){
                        return $ocLazyLoad.load({
                            name: 'app', /*name module(YourModuleApp)*/
                            files: [
                                'app/controllers/api/templateController.js',
                                'app/controllers/relatorios/relatorioGPRController.js',
                                'app/controllers/usuario/passwordChangeUsuarioController.js',
                                'app/services/autenticarService.js',
                                'app/services/relatorioService.js',
                                'app/services/locaisService.js',
                                'app/services/cidadeService.js',
                                'app/services/usuarioService.js',
                                'assets/css/slidebars.css',
                                'assets/js/switchery/switchery.min.css',
                                'assets/js/bootstrap-wysihtml5/bootstrap-wysihtml5.css',
                                'assets/js/summernote/dist/summernote.css',
                                'assets/css/style-responsive.css',
                                'assets/css/layout-theme-one.css',
                                'assets/css/material-icons.css'
                            ]
                        });
                    }]
                }
            }
        )

		.when('/404', { templateUrl: '404.html',  title: 'error application' })
		.otherwise({ redirectTo: '/404' });

	//remove the # in URLs
	$locationProvider.html5Mode(true);	
 	// $locationProvider.hashPrefix('!');

});

app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

/* directive template */
app.directive('mdSide', function(){
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'views/template/aside.html'
	}
});

app.directive('mdSidebar', function(){
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'views/template/sidebar.html'
	}
});

app.directive('mdHeader', function(){
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'views/template/header.html'
	}
});

app.directive('mdFooter', function(){
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'views/template/footer.html'
	}
});

//run application
app.run(function($rootScope, $location, $window, sessaoFactory){
	$rootScope.roles = [];
	$rootScope.$on('$routeChangeStart', function (event, next, current){
		var $count_roles = 0;
		var $url = undefined;
        var $user = $window.JSON.parse(sessaoFactory.get('ang_cm_user'));
		var $roles = ($user!=undefined) ? $user.permissao : undefined;
        if($roles!=undefined){
			for(var i=0;i<$roles.length;i++){
				$rootScope.roles.push($roles[i].permissao);
			}
            for(var $key=0;$key<$rootScope.roles.length;$key++){
                $url = $location.path();
                if($url.indexOf($rootScope.roles[$key]) >= 0){
                    $count_roles++;
                }
            }
            if($count_roles >= 1){
                if($user.id==undefined){
                    sessaoFactory.destroy('ang_cm_user');
                    $location.path('/login');
                }
            }else if($count_roles <= 0){
                sessaoFactory.destroy('ang_cm_user');
                $location.path('/login');
            }
        }else{
            sessaoFactory.destroy('ang_cm_user');
            $location.path('/login');
        }
	});
});