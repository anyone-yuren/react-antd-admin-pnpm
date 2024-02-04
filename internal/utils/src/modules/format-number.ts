import numeral from "numeral";

type InputValue = string | number | null | undefined;

export const fNumber = (number: InputValue) => numeral(number).format();

/**
 * 数字格式化
 * @param format
 * @param key
 * @returns
 */
function result(format: string, key = ".00") {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, "") : format;
}

/**
 * 转换货币为美元
 * @param number
 */
export function fCurrency(number: InputValue) {
  const format = number ? numeral(number).format("$0,0.00") : "";
  return result(format, ".00");
}
/**
 *  数字转换为百分比
 * @param number
 * @returns
 */
export function fPercent(number: InputValue): string {
  const format = number ? numeral(Number(number) / 100).format("0.0%") : "";
  return result(format, ".0");
}
