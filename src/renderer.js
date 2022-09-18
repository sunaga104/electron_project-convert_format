//Caseの設定値
const case1 = ["Upper", "Lower"];

//Caseの設定値
const case2 = [
  "spaceSeparated",
  "camelCase",
  "pascalCase",
  "snakeCase",
  "kebabCase",
];

//分割文字
const splitChar = {
  spaceSeparated: " ",
  camelCase: "A1",
  pascalCase: "A2",
  snakeCase: "_",
  kebabCase: "-",
};

//要素を取得
const inputAreaValue = document.getElementById("before_textarea");
const outputAreaValue = document.getElementById("after_textarea");

const beforeCharCase = document.getElementsByName("before_char_case");
const afterCharCase = document.getElementsByName("after_char_case");

const errMsg = document.getElementById("errMsg");

//イベントリスナー設定
addEventListenerInputArea(inputAreaValue);
addEventListenerRadioButton(beforeCharCase);
addEventListenerRadioButton(afterCharCase);

/**
 * inputareaにイベントリスナー設定
 *
 * @param element 要素
 */
function addEventListenerInputArea(element) {
  element.addEventListener("input", () => {
    changeValue();
  });
}

/**
 * ラジオボタンにイベントリスナー設定
 *
 * @param element 要素
 */
function addEventListenerRadioButton(element) {
  let len = element.length;
  for (let i = 0; i < len; i++) {
    element[i].addEventListener("change", function () {
      changeValue();
    });
  }
}

/**
 * 文字列変換処理
 *
 * @param element 要素
 */
function changeValue() {
  const wkBeforeCharCase = getCheckedValue(beforeCharCase);
  const wkAfterCharCase = getCheckedValue(afterCharCase);
  const inputValue = inputAreaValue.value;
  outputAreaValue.value = setOutputValue(inputValue, {
    wkBeforeCharCase,
    wkAfterCharCase,
  });
}

/**
 * ラジオボタンで選択されている要素の値を返す
 *
 * @param element ラジオボタンの要素
 * @returns 選択されている要素
 */
function getCheckedValue(element) {
  let len = element.length;
  let checkValue = "";
  for (let i = 0; i < len; i++) {
    if (element.item(i).checked) {
      checkValue = element.item(i).value;
    }
  }
  return checkValue;
}

/**
 * 入力された情報から、出力結果を設定する
 *
 * @param {*} inputValue 入力欄に入力された文字列
 * @param {*} charCase ラジオボタンの設定値 {before, after}
 * @returns 出力する文字列
 */
function setOutputValue(inputValue, charCase) {
  const selectedCaseNumber = getSelectedCaseNumber(charCase);
  errMsg.innerText = "";

  //Case1の場合大文字小文字変換
  if (selectedCaseNumber == 1) {
    return changeCase1(inputValue, charCase);
  } else if (selectedCaseNumber == 2) {
    return changeCase2(inputValue, charCase);
  } else {
    errMsg.innerText = "Please select the same case";
    return inputValue;
  }
}

/**
 * ラジオボタンで設定したcaseを取得
 *
 * @param charCase ラジオボタンの要素
 * @returns 1 -> case1、 2 -> case2、 99 ~> 設定ミス
 */
function getSelectedCaseNumber(charCase) {
  if (
    case1.includes(charCase.wkBeforeCharCase) &&
    case1.includes(charCase.wkAfterCharCase)
  ) {
    return 1;
  }
  if (
    case2.includes(charCase.wkBeforeCharCase) &&
    case2.includes(charCase.wkAfterCharCase)
  ) {
    return 2;
  }
  return 99;
}

/**
 * case1
 * 大文字小文字変換
 *
 * @param {*} inputValue 入力値
 * @param {*} charCase ラジオボタンの選択値
 * @returns 大文字 -> 小文字 、もしくは小文字 -> 大文字
 */
function changeCase1(inputValue, charCase) {
  if (
    charCase.wkBeforeCharCase == "Upper" &&
    charCase.wkAfterCharCase == "Lower"
  ) {
    return inputValue.toLowerCase();
  }
  if (
    charCase.wkBeforeCharCase == "Lower" &&
    charCase.wkAfterCharCase == "Upper"
  ) {
    return inputValue.toUpperCase();
  }
  if (
    (charCase.wkBeforeCharCase == "Upper" &&
      charCase.wkAfterCharCase == "Upper") ||
    (charCase.wkBeforeCharCase == "Lower" &&
      charCase.wkAfterCharCase == "Lower")
  ) {
    return inputValue;
  }
}

/**
 * case2
 * 指定の方法で変換
 *
 * @param {*} inputValue 入力値
 * @param {*} charCase ラジオボタンの選択値
 * @returns 変換後文字列
 */
function changeCase2(inputValue, charCase) {
  let charRowArray = []; //列ごとの文字列
  let charMainArray = []; //指定文字で分割された文字列

  charRowArray = inputValue.split(/\n/);

  for (const element of charRowArray) {
    //camelCaseもしくはpascalCaseの場合
    if (
      splitChar[charCase.wkBeforeCharCase] == "A1" ||
      splitChar[charCase.wkBeforeCharCase] == "A2"
    ) {
      charMainArray.push(
        element.split(/(^[a-z]+)|([A-Z][a-z]+)/).filter(isNotEmptyItem)
      );
      //その他の分割
    } else {
      charMainArray.push(element.split(splitChar[charCase.wkBeforeCharCase]));
    }
  }

  let wkstr = "";
  //camelCase
  if (splitChar[charCase.wkAfterCharCase] == "A1") {
    for (const element of charMainArray) {
      let count = 0;
      for (const eachElement of element) {
        if (count == 0) {
          wkstr = wkstr + eachElement;
        } else {
          wkstr = wkstr + eachElement[0].toUpperCase() + eachElement.slice(1);
        }
        count++;
      }
      wkstr = wkstr + "\n";
    }
    //pascalCase
  } else if (splitChar[charCase.wkAfterCharCase] == "A2") {
    for (const element of charMainArray) {
      for (const eachElement of element) {
        wkstr = wkstr + eachElement[0].toUpperCase() + eachElement.slice(1);
      }
      wkstr = wkstr + "\n";
    }
    //その他
  } else {
    for (const element of charMainArray) {
      for (const eachElement of element) {
        wkstr = wkstr + eachElement + splitChar[charCase.wkAfterCharCase];
      }
      wkstr = wkstr.substring(0, wkstr.length - 1);
      wkstr = wkstr + "\n";
    }
  }
  return wkstr;
}

/**
 * 大文字か判定
 * @param {*} str 対象文字列
 * @returns true or false
 */
function isUpperCase(str) {
  return str === str.toUpperCase() ? true : false;
}

/**
 * 文字列が空でないか判定
 *
 * @param str 対象文字列
 * @returns true -> 空でない falue -> 空
 */
function isNotEmptyItem(str) {
  if (str === "" || str === undefined) {
    return false;
  }
  return true;
}
