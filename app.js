// Adaptee - clasa care trebuie adaptată
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

// Clientul - codul care folosește interfața Target
class CurrencyConverter {
    constructor(exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }

    convert(amount, fromCurrency, toCurrency) {
        const exchangeRate = this.exchangeRateService.getExchangeRate(fromCurrency, toCurrency);
        return amount * exchangeRate;
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

// Inițializăm convertorul de valută cu serviciul de schimb valutar adaptat
const euroExchangeRateService = new EuroExchangeRateService();
const exchangeRateService = new EuroToDollarExchangeRateAdapter(euroExchangeRateService);
const currencyConverter = new CurrencyConverter(exchangeRateService);

// Conversia valorii în valută
const amountInput = document.getElementById("amount-input");
const currencySelect = document.getElementById("currency-select");
const convertButton = document.getElementById("convert-button");
const totalOutput = document.getElementById("total-output");

convertButton.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = "EUR";
    const toCurrency = currencySelect.value;
    const total = currencyConverter.convert(amount, fromCurrency, toCurrency);
    totalOutput.innerText = total;
});

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

  // Implementarea RefinedAbstraction pentru generarea de HTML-uri
  class HtmlDocumentGenerator extends DocumentGenerator {
    constructor(outputFormatter) {
      super(outputFormatter);
    }

    generateDocument(formattedContent) {
      return `HTML:\n${formattedContent}`;
    }
  }

  // Implementarea RefinedAbstraction pentru generarea de XML-uri
  class XmlDocumentGenerator extends DocumentGenerator {
    constructor(outputFormatter) {
      super(outputFormatter);
    }

    generateDocument(formattedContent) {
      return `XML:\n${formattedContent}`;
    }
  }

  // Implementarea Implementorului
  class OutputFormatter {
    format(content) {
      throw new Error("Not implemented");
    }
  }

  // Implementarea ConcreteImplementor pentru formatarea ca text simplu
  class PlainTextOutputFormatter extends OutputFormatter {
    format(content) {
      return content;
    }
  }

  // Implementarea ConcreteImplementor pentru formatarea ca text HTML
  class HtmlOutputFormatter extends OutputFormatter {
    format(content) {
      return `<p>${content}</p>`;
    }
  }

  // Implementarea ConcreteImplementor pentru formatarea ca text XML
  class XmlOutputFormatter extends OutputFormatter {
    format(content) {
      return `<document>${content}</document>`;
    }
  }

  // Inițializăm generatorul de documente cu implementorul de formatare
  const plainTextOutputFormatter = new PlainTextOutputFormatter();
  const htmlOutputFormatter = new HtmlOutputFormatter();
  const xmlOutputFormatter = new XmlOutputFormatter();

  const pdfDocumentGenerator = new PdfDocumentGenerator(plainTextOutputFormatter);
  const htmlDocumentGenerator = new HtmlDocumentGenerator(htmlOutputFormatter);
  const xmlDocumentGenerator = new XmlDocumentGenerator(xmlOutputFormatter);

  // Generarea documentului
  const documentTypeSelect = document.getElementById("document-type-select");
  const documentContent = document.getElementById("document-content");
  const generatedDocument = document.getElementById("generated-document");

  documentTypeSelect.addEventListener("change", () => {
    let documentGenerator;

    switch (documentTypeSelect.value) {
      case "PDF":
        documentGenerator = pdfDocumentGenerator;
        break;
      case "HTML":
      documentGenerator = htmlDocumentGenerator;
					break;
				case "XML":
					documentGenerator = xmlDocumentGenerator;
					break;
			}

			if (documentGenerator) {
				const content = documentContent.value;
				const generatedContent = documentGenerator.generate(content);
				generatedDocument.value = generatedContent;
			}
		});

	
		// Implementarea Componentei
		class MenuItem {
			constructor(text) {
				this.text = text;
			}

			render() {
				throw new Error("Not implemented");
			}
		}

		// Implementarea Composite-ului
		class Menu {
			constructor() {
				this.items = [];
			}

			add(item) {
				this.items.push(item);
			}

			render() {
				const menuElement = document.createElement("ul");

				for (const item of this.items) {
					const itemElement = item.render();
					menuElement.appendChild(itemElement);
				}

				return menuElement;
			}
		}

		// Implementarea Leaf-ului
		class MenuItemLeaf extends MenuItem {
			render() {
				const itemElement = document.createElement("li");
				itemElement.innerText = this.text;
				return itemElement;
			}
		}

		// Implementarea Composite-ului
		class MenuItemComposite extends MenuItem {
			constructor(text) {
				super(text);
				this.menu = new Menu();
			}

			add(item) {
				this.menu.add(item);
			}

			render() {
				const itemElement = document.createElement("li");
				itemElement.innerText = this.text;
				itemElement.appendChild(this.menu.render());
				return itemElement;
			}
		}

		// Inițializăm meniul
		const menu = new Menu();

		const element1 = new MenuItemLeaf("Element 1");
		menu.add(element1);

		const element2 = new MenuItemLeaf("Element 2");
		menu.add(element2);

		const element3 = new MenuItemComposite("Element 3");
		const element3_1 = new MenuItemLeaf("Element 3.1");
		element3.add(element3_1);
		const element3_2 = new MenuItemLeaf("Element 3.2");
		element3.add(element3_2);
		menu.add(element3);

		const element4 = new MenuItemLeaf("Element 4");
		menu.add(element4);

		const element5 = new MenuItemComposite("Element 5");
		const element5_1 = new MenuItemLeaf("Element 5.1");
		element5.add(element5_1);
		const element5_2 = new MenuItemLeaf("Element 5.2");
		element5.add(element5_2);
		const element5_3 = new MenuItemLeaf("Element 5.3");
		element5.add(element5_3);
menu.add(element5);
		// Adăugăm meniul în document
		const menuElement = menu.render();
		document.body.appendChild(menuElement);

	
	// Implementarea Componentei
class TextComponent {
    constructor() {
      this.text = "";
      this.decorator = null;
    }
  
    getText() {
      return this.text;
    }
  
    setText(text) {
      this.text = text;
    }
  
    render() {
      if (this.decorator) {
        return this.decorator.render();
      } else {
        return this.getText();
      }
    }
  
    setTextDecorator(decorator) {
      decorator.setComponent(this);
      this.decorator = decorator;
    }
  }
  
  // Implementarea ConcreteComponentei
  class PlainTextComponent extends TextComponent {
  }
  
  // Implementarea Decoratorului
  class TextDecorator extends TextComponent {
    constructor() {
      super();
      this.component = null;
    }
  
    setComponent(component) {
      this.component = component;
    }
  
    render() {
      return this.component.render();
    }
  }
  
  // Implementarea ConcreteDecoratorului pentru textul bold
  class BoldTextDecorator extends TextDecorator {
    render() {
      const originalText = this.component.getText();
      return `<b>${originalText}</b>`;
    }
  }
  
  // Implementarea ConcreteDecoratorului pentru textul italic
  class ItalicTextDecorator extends TextDecorator {
    render() {
      const originalText = this.component.getText();
      return `<i>${originalText}</i>`;
    }
  }
  
  // Implementarea ConcreteDecoratorului pentru textul subliniat
  class UnderlineTextDecorator extends TextDecorator {
    render() {
      const originalText = this.component.getText();
      return `<u>${originalText}</u>`;
    }
  }
  
  // Inițializăm decoratorii
  const boldDecorator = new BoldTextDecorator();
  const italicDecorator = new ItalicTextDecorator();
  const underlineDecorator = new UnderlineTextDecorator();
  
  // Inițializăm componenta de text
  const textComponent = new PlainTextComponent();
  
  // Funcția de actualizare a textului decorat
  function updateDecoratedText() {
      const decoratedTextElement = document.getElementById("decorated-text");
      const decoratedResultElement = document.getElementById("decorated-result");
  
      textComponent.setText(decoratedTextElement.value);
      const decoratedText = textComponent.render();
      decoratedResultElement.innerHTML = decoratedText;
  }
  
  // Inițializăm decoratorii și îi legăm între ei
  const boldCheckbox = document.getElementById("bold-checkbox");
  const italicCheckbox = document.getElementById("italic-checkbox");
  const underlineCheckbox = document.getElementById("underline-checkbox");
  
  if (boldCheckbox) {
      boldCheckbox.addEventListener("change", () => {
          if (boldCheckbox.checked) {
              textComponent.setTextDecorator(new BoldTextDecorator());
          } else {
              textComponent.removeTextDecorator(BoldTextDecorator);
          }
  
          updateDecoratedText();
      });
  }
  
  if (italicCheckbox) {
      italicCheckbox.addEventListener("change", () => {
          if (italicCheckbox.checked) {
              textComponent.setTextDecorator(new ItalicTextDecorator());
          } else {
              textComponent.removeTextDecorator(ItalicTextDecorator);
          }
  
          updateDecoratedText();
      });
  }
  
  if (underlineCheckbox) {
      underlineCheckbox.addEventListener("change", () => {
          if (underlineCheckbox.checked) {
              textComponent.setTextDecorator(new UnderlineTextDecorator());
          } else {
              textComponent.removeTextDecorator(UnderlineTextDecorator);
          }
  
          updateDecoratedText();
      });
  }
  
  // Inițializăm textul și decorarea
  updateDecoratedText();
  
  
  