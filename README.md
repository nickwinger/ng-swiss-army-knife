# NgSwissArmyKnife

This library provides common Tools, Helpers, Directives, Components, Services and Pipes
that are often used in different angular projects.

So it should be a swiss army knife for angular developers ;-D

But it also contains a lot of useful stuff for just javascript developers or css styling
_If you find something missing or have suggestions please let me know._

I work on different angular projects and will update this library frequently.
## Installation

run  `npm i ng-swiss-army-knife --save`

## API

### Form Validators
#### dateGreaterThan
Checks if a date is greater than another (angular form controls)

### Classes
#### CachedObservable
How many times you wanted a cached observable out of the box ?
Here you have it.
Give it a cache duration in seconds and the rest works automagically.
e.g.:
```
export class ApiService {
  myCachedApiCall$: CachedObservable<string[]>;

  constructor(protected http: HttpClient) {
  }

  getAllNames(): Observable<string[]> {
    if (!this.myCachedApiCall$) {
      this.myCachedApiCall$ = new CachedObservable(60, // Cache for one  minute
        this.http.get<string[]>(`${environment.urls.apiUrl}/getAllNames`));
    }

    return this.myCachedApiCall$.getObservable();
  }
}
```
For convenience there is also a cachedObservable service (see section services), which is even 
more simpler to use.
### Directives
#### ngIonSync
This is a workaround helper for Ionic4/5 using Angular-Reactive-Forms.
If you programmatically use the markAs*** functions on an angular form control it won't sync up to the ion-input or ion-item.
This attribute directive syncs these css classes as a workaround because it is still not working see:
https://github.com/ionic-team/ionic/issues/20650
 
#### ShadowDomStyleDirective - Styling ShadowDom
With this directive you can style an element inside the shadow dom.
This is useful e.g. for Ionic Components which all hidden by the Shadow-Dom.
<br>
Usage Example:<br>
```
<ion-item [shadowStyle]="{selector: '.input-wrapper', style: { overflow: 'visible'}}">
```
### Functions
#### createAutoIndexer
With this method you can merge 2 Objects properties. You have a main object and a an object that extends the  main object.
This is usefull if you want to implement an interface in a class but you don't want
to copy and assign all the properties of the interface object.
Then automagically all the properties of the anonymous interface object can be access through the merged
object and you can extend it.
E.g.:
```
export class Container implements Partial<IContainer> {
   constructor(private wrapped: IContainer) {
   }
 
   get fullPath(): string {
     return !!this.wrapped.path ? this.wrapped.path + '.' + this.wrapped.id :
       this.wrapped.id;
   }
 
   static create(wrapped: IContainer): Container {
     return createAutoIndexer(new Container(wrapped), wrapped);
   }
 }
```
### Services
#### CachedObservableService
How many times you wanted a cache your api calls out of the box ?
Here you have it.
Give it a cache duration in seconds and the rest works automagically.
e.g.:
```
export class ApiService {
  constructor(private http: HttpClient, private CachedObservableService) {
  }

  getAllNames(): Observable<string[]> {
    return this.cache.getOrCreate<string[]>('getAllNames', 60 * 15,
      this.http.get<string[]>(`${environment.urls.apiUrl}/getAllNames`));
  }
}
```

#### PubSubService
Simple publish/subscribe service.

Userful for inter-component communication
#### KeyValueStore
If you are fed up about implementing a whole Redux solution, this might be your bet.
It's a simple solution to have a key-value store that is synced to the localstorage.
e.g.:

```
export interface Store {
    darkMode: boolean;
    language: string;
}

// Optionally you can define an initial store state
// but if there is already something in the localstorage stored
// it will be taken from the localstorage
@NgModule({
    ...
  providers: [
    ...
    {
      provide: KeyValueStoreInitialValue,
      useValue: <Store>{
        darkMode: true,
        language: 'de'
      }
    }
  ],
})
export class AppModule {
}

export class MyComponent {
    constructor(store: KeyValueStoreService<Store>) {
        this.store.getValue$<string>('language').subscribe(language => {
          this.translate.use(language);
        });

        this.store.setValue('language', 'en');
        const currentLang = this.store.getValue<string>('language');
    
        this.store.getValue$<boolean>('darkMode').subscribe(darkMode => {
          this.helper.toggleDarkTheme(darkMode);
        });
    
        this.store.getStore$().subscribe(store => {
          console.log('saving to backend', store);
        });

        this.store.getAllChanges$().subscribe(change => {
            console.log(`key ${change.key} changed from ${change.previousValue} to ${change.currentValue}`);
        });

        this.store.getValueChanges$<boolean>('darkMode').subscribe(change => {
            console.log(`darkMode changed from ${change.previousValue} to ${change.currentValue}`);
        });
    }    
}
```
I find this useful in nearly every project you need some simple key value solution which you can subscribe to
and i find myself writing the same logic again when i don't want to implement
a whole store/redux solution which might be just over complicated or too much.

### Pipes:
**roundNumber pipe**
takes one argument, the digits to round the number
e.g. {{0.123123 | roundNumber:2}}

### SCSS Styles:
You can include the atoms.scss to be able to do atom-styling, meaning
you have one css class for one styling property, e.g.:
`<div class="marginT20 cursorPointer padding5"></div>`

### Angular Typescript:

[Click here for the full documentation](https://nickwinger.github.io/ng-swiss-army-knife/)

## Usage
For simplicity you can typ SwissArmyKnife anywhere
in your application and the intellisense will show you
everything that the knife has to offer.
![Intellisense1](https://raw.githubusercontent.com/nickwinger/ng-swiss-army-knife/master/assets/intellisense1.png "Intellisense1")

(technically we made a class with static members, so all
the helpers, services, etc. are at one place and you don't have
to guess the names...)

Also you can find all the helpers if you typ Helper(dot)
We find this very handy, as you don't remember all the helper function
names if the are just loose.
![Intellisense2](https://raw.githubusercontent.com/nickwinger/ng-swiss-army-knife/master/assets/intellisense2.png "Intellisense2")



## Development
* When checkin to GIT run "npm run compodoc" before
* To create a new version and automatically deploy to NPM: 
* 1. manually update the version in the projects/ng-swiss-army-knife/package.json
  2. GIT Commit
  3. "npm version NEW_VERSION" in project root
  (git push --follow-tags may not work inside npm, then you have to type it manually)
  4. Commit and Push to Git
  
bit4bit
