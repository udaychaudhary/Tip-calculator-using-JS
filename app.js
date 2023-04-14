class BillSplitterUI {
  constructor() {
    this.totalInput = document.getElementById('inputBill');
    this.peopleInput = document.getElementById('numberOFpeople');
    this.tipPercentInput = document.getElementById('tipPercent');
    this.tipPerPersonOutput = document.getElementById('tipOutput');
    this.totalPerPersonOutput = document.getElementById('totalOutput');

    this.totalInput.addEventListener('input', () => {
      let value = this.totalInput.value;
      value = value.replace(/[^0-9.]/g, '');
      this.totalInput.value = value;

      if (this.totalInput.value < 0) {
        this.totalInput.value = 0;
      }
      this.splitBill();
    });

    this.peopleInput.addEventListener('input', () => {
      let value = this.peopleInput.value;
      value = value.replace(/[^0-9.]/g, '');
      this.peopleInput.value = value;

      if (this.peopleInput.value < 0) {
        this.peopleInput.value = 1;
      }
      this.splitBill();
    });

    this.tipPercentInput.addEventListener('input', () => {
      let value = this.tipPercentInput.value;
      value = value.replace(/[^0-9.]/g, '');
      this.tipPercentInput.value = value;

      if (this.tipPercentInput.value < 0) {
        this.tipPercentInput.value = 0;
      }
      if (this.tipPercentInput.value > 100) {
        this.tipPercentInput.value = 100;
      }
      this.splitBill();
    });
  }
  
  splitBill() {
    let total = parseFloat(this.totalInput.value);
    let people = parseFloat(this.peopleInput.value);
    let tipPercent = this.tipPercentInput.value;
    
    if (tipPercent !== 0) {
      let calcPercent = parseInt(tipPercent);
      const tip = (calcPercent * total) / 100;
      const totalWithTip = ((total + tip) / people).toFixed(2);
      const calcTip = (tip / people).toFixed(2);

      if(isNaN(totalWithTip) == false){
        this.totalPerPersonOutput.textContent = totalWithTip;
      }

      if(isNaN(calcTip) == false){
        this.tipPerPersonOutput.textContent = calcTip;
      }
      
    } else {
      const result = total / people;
      this.totalPerPersonOutput.textContent = result.toFixed(2);
    }
  }
}

class operations{
  constructor(billObj)
  {
    this.buttonMinusPeople = document.getElementById('buttonMinusPeople');
    this.buttonPlusPeople = document.getElementById('buttonPlusPeople');
    this.buttonMinusTip = document.getElementById('buttonMinusTip');
    this.buttonPlusTip = document.getElementById('buttonPlusTip');

    this.buttonMinusPeople.addEventListener("click", () => {
      if(billObj.peopleInput.value>1){
      billObj.peopleInput.value--;
      billObj.splitBill();
    }
    });

    this.buttonPlusPeople.addEventListener("click", () => {
      billObj.peopleInput.value++;
      billObj.splitBill();
    });

    this.buttonMinusTip.addEventListener("click", () => {
      if(billObj.tipPercentInput.value>0){
      billObj.tipPercentInput.value--;
      billObj.splitBill();
    }
    });

    this.buttonPlusTip.addEventListener("click", () => {
      if(billObj.tipPercentInput.value<100){
      billObj.tipPercentInput.value++;
      billObj.splitBill();
    }
    });
  }
}

const billSplitterUI = new BillSplitterUI();
const opObj = new operations(billSplitterUI);