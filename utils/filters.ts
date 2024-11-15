// دوال التصفية المختلفة
export const filterFns = {
  // فلتر النص العادي
  text: (row, id, filterValue) => {
    const value = String(row.getValue(id) || '').toLowerCase();
    return value.includes(String(filterValue).toLowerCase());
  },

  // فلتر الاختيار المفرد
  select: (row, id, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true;
    const cellValue = row.getValue(id);
    return filterValue === cellValue;
  },

  // فلتر الاختيار المتعدد
  multiSelect: (row, id, filterValues) => {
    if (!filterValues || filterValues.length === 0) return true;
    const cellValue = row.getValue(id);
    if (!cellValue) return false;
    return filterValues.includes(String(cellValue));
  },

  // فلتر النطاق العددي
  range: (row, id, filterValue: [number, number]) => {
    if (!filterValue || !Array.isArray(filterValue) || filterValue.length !== 2) {
      return true;
    }
    const [min, max] = filterValue;
    const value = Number(row.getValue(id));
    if (isNaN(value)) return false;
    return value >= min && value <= max;
  },

  // فلتر شريط النطاق
  rangeSlider: (row, id, filterValue: [number, number]) => {
    if (!filterValue || !Array.isArray(filterValue) || filterValue.length !== 2) {
      return true;
    }
    const [min, max] = filterValue;
    const value = Number(row.getValue(id));
    if (isNaN(value)) return false;
    return value >= min && value <= max;
  },

  // فلتر التاريخ المفرد
  date: (row, id, filterValue) => {
    if (!filterValue) return true;
    const cellValue = row.getValue(id);
    if (!cellValue) return false;

    const value = dayjs(cellValue);
    const filterDate = dayjs(filterValue);

    return value.format('YYYY-MM-DD') === filterDate.format('YYYY-MM-DD');
  },

  // فلتر نطاق التاريخ
  dateRange: (row, id, filterValue: [Date, Date]) => {
    if (!filterValue || !Array.isArray(filterValue) || filterValue.length !== 2) {
      return true;
    }
    const cellValue = row.getValue(id);
    if (!cellValue) return false;

    const value = dayjs(cellValue);
    const [start, end] = filterValue.map(date => dayjs(date));

    return value.isAfter(start) && value.isBefore(end);
  },

  // فلتر القيمة المنطقية
  boolean: (row, id, filterValue) => {
    if (filterValue === undefined || filterValue === '') return true;
    const value = row.getValue(id);
    return value === filterValue;
  },

  // فلتر مربع الاختيار
  checkbox: (row, id, filterValue) => {
    if (filterValue === undefined) return true;
    const value = Boolean(row.getValue(id));
    return value === filterValue;
  },

  // فلتر الإكمال التلقائي
  autocomplete: (row, id, filterValue) => {
    if (!filterValue) return true;
    const value = String(row.getValue(id) || '').toLowerCase();
    return value.includes(String(filterValue).toLowerCase());
  }
};

// إضافة إعدادات الفلتر
export const getMultiSelectFilterProps = ({ column, data }) => {
  // الحصول على البيانات الفريدة من العمود
  const uniqueValues = Array.from(
    new Set(
      data
        .map((row) => row[column.id])
        .filter((value) => value !== null && value !== undefined)
    )
  ).sort();

  // تحويل القيم إلى تنسيق الخيارات المطلوب
  const options = uniqueValues.map((value) => ({
    value: String(value),
    label: String(value)
  }));

  return {
    data: options,
    clearable: true,
    searchable: true,
    onChange: (values) => {
      column.setFilterValue(values);
    }
  };
};

// إعدادات فلتر التاريخ المفرد
export const getDateFilterProps = ({ column }) => ({
  type: 'date',
  clearable: true,
  valueFormat: 'DD/MM/YYYY',
  styles: {
    root: {
      width: '100%'
    },
    input: {
      minWidth: 'unset',
      width: '100%'
    }
  },
  onChange: (date: Date) => {
    column.setFilterValue(date);
  }
});

// إعدادات فلتر نطاق التاريخ
export const getDateRangeFilterProps = ({ column }) => ({
  type: 'range',
  allowSingleDateInRange: false,
  clearable: true,
  valueFormat: 'DD/MM/YYYY',
  styles: {
    root: {
      width: '100%'
    },
    input: {
      minWidth: 'unset',
      width: '100%'
    }
  },
  onChange: (dates: [Date, Date]) => {
    column.setFilterValue(dates);
  }
}); 