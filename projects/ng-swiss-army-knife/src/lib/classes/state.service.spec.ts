import { TestBed } from '@angular/core/testing';

import { StatefulObject } from './stateFulObject';
import { Injectable } from '@angular/core';

interface TestState {
  name: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})
class MyStateService extends StatefulObject<TestState> {
  constructor() {
    super();
    this.setState({name: 'Nick', age: 40});
  }
}
describe('StateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should set new state correctly', () => {
    const service: MyStateService = TestBed.get(MyStateService);

    expect(service.stateSnapshot.age).toBe(40);
    expect(service.stateSnapshot.name).toBe('Nick');

    const stateObject = new StatefulObject<TestState>();
    stateObject.setState({
      age: 40, name: 'Nick'
    });

    expect(stateObject.stateSnapshot.age).toBe(40);
    expect(stateObject.stateSnapshot.name).toBe('Nick');

    stateObject.setState({
      name: 'Hubert'
    });

    expect(stateObject.stateSnapshot.name).toBe('Hubert');
    expect(stateObject.stateSnapshot.age).toBe(40);


  });
});
