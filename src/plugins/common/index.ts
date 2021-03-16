import { IDictionary, ISelectOptions } from "@cr/types";

/**
 *
 * @param list 创建下拉列表数据源
 * @param labelField
 * @param valueField
 */
export const createSelectOptions = function(
  list: Array<IDictionary<any>>,
  labelField: string,
  valueField: string,
): ISelectOptions {
  if (!list || list.length == 0) {
    return [];
  }
  const arrs: ISelectOptions = [];
  list.map((x) => {
    const item = { label: x[labelField], value: x[valueField] };
    arrs.push(item);
  });
  return arrs;
};
