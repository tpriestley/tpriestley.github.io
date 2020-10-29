import React from 'react';
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom';
import App from './App';

const DATA = [
    { id: "todo-0", name: "Eat", completed: true },
    { id: "todo-1", name: "Sleep", completed: false },
    { id: "todo-2", name: "Repeat", completed: false }
  ];


describe('Array and Object Tests', () => {
    test('Property and Boolean Test', () => {
        expect(DATA[0]).toHaveProperty('completed', true)
    });
    
    test('Task Array Count', () => {
        expect(DATA.length).toBe(3)
    });
});

describe('String Tests', () => {
    const container = document.createElement("div");
    ReactDOM.render(<App tasks={DATA}/>, container);
    test('Value of Tasks Remaining', () => {
        expect(container.querySelector("h3").textContent).toBe("3 tasks remaining")
    });
    test('Value of Tasks Remaining', () => {
        expect(container.querySelector("h2").textContent).toBe("What needs to be done?")
    });
    test('Value of Add Button', () => {
        expect(container.querySelector("button").textContent).toBe("Add")
    });
});

describe('Snapshot Test', () => {
    test('App snapshot test', () => {
        const component = renderer.create(<App tasks={DATA}/>);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});