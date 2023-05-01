# Exemplu de aplicație web cu design pattern-uri
Acest document descrie patru modele de design - Adaptor, Bridge, Composite și Decorator - și oferă exemple de cod în JavaScript pentru a ilustra modul în care acestea pot fi utilizate în practică.

## Cuprins
- [Adapter Pattern](#adapter-pattern)
- [Bridge Pattern](#bridge-pattern)
- [Composite Pattern](#composite-pattern)
- [Decorator Pattern](#decorator-pattern)

## Adapter Pattern

Adapter Pattern este un pattern structural care permite ca două interfețe incompatibile să colaboreze. Acesta constă în crearea unei clase intermediare care convertește interfața existentă a unei clase într-o interfață compatibilă cu cea folosită de client.
```
// Adapter - clasa care trebuie adaptată
class EuroExchangeRateService {
    getExchangeRate() {
        return 4.9;
    }
}

// Interfața Target - interfața pe care o folosește clientul
class ExchangeRateService {
    constructor(adaptee) {
        this.adaptee = adaptee;
    }

    getExchangeRate() {
        return this.adaptee.getExchangeRate();
    }
}

// Adapterul - adaptează clasa EuroExchangeRateService la interfața ExchangeRateService
class EuroToDollarExchangeRateAdapter extends ExchangeRateService {
    constructor(euroExchangeRateService) {
        super();
        this.euroExchangeRateService = euroExchangeRateService;
    }

    getExchangeRate(fromCurrency, toCurrency) {
        if (fromCurrency === "EUR" && toCurrency === "USD") {
            return this.euroExchangeRateService.getExchangeRate();
        } else {
            throw new Error(`Cannot convert from ${fromCurrency} to ${toCurrency}`);
        }
    }
}
```

## Bridge Pattern

Bridge Pattern este un pattern structural care separă abstracția de implementare, astfel încât cele două să poată fi modificate independent. Acest pattern încurajează compunerea peste moștenire, oferind flexibilitate și posibilitatea de a extinde codul fără a afecta celelalte părți ale sistemului.
```
// Implementarea Abstracției
class DocumentGenerator {
    constructor(outputFormatter) {
        this.outputFormatter = outputFormatter;
    }

    generate(content) {
        const formattedContent = this.outputFormatter.format(content);
        return this.generateDocument(formattedContent);
    }

    generateDocument(formattedContent) {
        throw new Error("Not implemented");
    }
}

// Implementarea RefinedAbstraction pentru generarea de PDF-uri
class PdfDocumentGenerator extends DocumentGenerator {
    constructor(outputFormatter) {
        super(outputFormatter);
    }

    generateDocument(formattedContent) {
        return `PDF:\n${formattedContent}`;
    }
}
```
## Composite Pattern

Composite Pattern este un pattern structural care permite compunerea obiectelor într-o structură de tip arbore pentru a reprezenta ierarhii parte-întreg. Acest pattern permite clienților să trateze obiecte individuale și compuși în mod uniform.

```
// Implementarea Componentei
class MenuItem {
    constructor(text) {
        this.text = text;
    }

    render() {
        throw new Error("Not implemented");
    }
}
render() {
    return `<li>${this.text}</li>`;
}
}

// Implementarea Composite
class CompositeMenuItem extends MenuItem {
constructor(text) {
super(text);
this.children = [];
}

addChild(child) {
    this.children.push(child);
}

render() {
    const renderedChildren = this.children.map(child => child.render()).join("");
    return `<li>${this.text}<ul>${renderedChildren}</ul></li>`;
}
}

```

## Decorator Pattern

Decorator Pattern este un pattern structural care permite adăugarea de comportament suplimentar la un obiect fără a afecta structura sa. Acest pattern este o alternativă la extinderea unei clase prin moștenire, oferind flexibilitate și posibilitatea de a combina mai multe comportamente la runtime.

```
// Interfața Component
class Beverage {
    constructor() {
        this.description = "Unknown Beverage";
    }

    getDescription() {
        return this.description;
    }

    cost() {
        throw new Error("Not implemented");
    }
}

// Implementarea ConcreteComponent
class Espresso extends Beverage {
    constructor() {
        super();
        this.description = "Espresso";
    }

    cost() {
        return 1.99;
    }
}

// Implementarea Decorator
class BeverageDecorator extends Beverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
}

// Implementarea ConcreteDecorator
class Whip extends BeverageDecorator {
    constructor(beverage) {
        super(beverage);
    }

    getDescription() {
        return this.beverage.getDescription() + ", Whip";
    }

    cost() {
        return this.beverage.cost() + 0.50;
    }
}
```
