// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
  	apiKey: "AIzaSyBzpWQ2zbfSwlQkm1zAF2H_fze4_KtV9fM",
    authDomain: "cart-515d5.firebaseapp.com",
    databaseURL: "https://cart-515d5.firebaseio.com",
    projectId: "cart-515d5",
    storageBucket: "cart-515d5.appspot.com",
    messagingSenderId: "118793002258"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
