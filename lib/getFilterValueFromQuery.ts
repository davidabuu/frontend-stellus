export default function getFilterValue<FilterType extends string | number | symbol>(
  filterValues: ReadonlyArray<FilterType>,
  val: string | Array<string> | undefined
): FilterType | undefined {
  if (typeof val === 'string' && filterValues.includes(val as FilterType)) {
    return val as FilterType;
  }
}
