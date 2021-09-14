/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function numberFormat(val) {
  if(!val){
    return '0.00'
  }else {
    // val = Number(val)
    return val.toFixed(2);
  }
  // return /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(val);
}

export function tease(val) {
  if(val){
    return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }else {
    return '0'
  }

}

/**
 * 千位一逗
 * 10000 => "10,000"  有小数保留小数,小数是00报错小数
 */
export function toThousandFilters(num)  {
  num = num + '';
  if (!num.includes('.')) {
      num += '.'
  }
  return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ',';
  }).replace(/\.$/,".00");

}
export function toThousandFilter(num) {
  return (+num || 0)
      .toString()
      .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
    // var newStr = "";
    // var count = 0;
    // str = String(str)
    // // 当数字是整数
    // if (str.indexOf(".") == -1) {
    //     for (var i = str.length - 1; i >= 0; i--) {
    //         if (count % 3 == 0 && count != 0) {
    //             newStr = str.charAt(i) + "," + newStr;
    //         } else {
    //             newStr = str.charAt(i) + newStr;
    //         }
    //         count++;
    //     }
    //     str = newStr ; //自动补小数点后两位
    //     return str;
    // }
    // // 当数字带有小数
    // else {
    //     for (var i = str.indexOf(".") - 1; i >= 0; i--) {
    //         if (count % 3 == 0 && count != 0) {
    //             newStr = str.charAt(i) + "," + newStr;
    //         } else {
    //             newStr = str.charAt(i) + newStr; //逐个字符相接起来
    //         }
    //         count++;
    //     }
    //     str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    //     return str;
    // }
}
/**
 * 最多两位小数
 */
export function validateTwoDecimal(string) {
  return /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/.test(string);
}
export function money(val){
  // console.log(val)

  // if(val > 10000){
    if(val > 10000){
      // let b = String(val / 10000)
      return toThousandFilter(String(val / 10000)) + '万元'
    }else{
      return val + '元'
    }

    // let n = b.substr(b.length-1,1)
    // if(n > 4){
    //   // console.log( b)
    //   return b
    // }else{
    //   console.log(b.substr(b.length-1,1))
    //   return b.substr(b.length-1,1)
    // }
  // }

}

