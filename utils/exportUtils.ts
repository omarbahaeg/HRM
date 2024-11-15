import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { mkConfig, generateCsv, download } from 'export-to-csv';

// تكوين إعدادات تصدير ملف CSV
export const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});

interface ExportData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  registeredOn: string | Date;
}

/**
 * دالة معالجة التصدير للملفات بمختلف الصيغ
 * @param data البيانات المراد تصديرها
 * @param format صيغة الملف المراد تصديره
 * @param type نوع التصدير (الكل أو المحدد)
 */
export const handleExport = (
  data: ExportData[],
  format: 'pdf' | 'excel' | 'csv' | 'json',
  type: 'all' | 'selected' = 'all'
) => {
  // تنسيق البيانات قبل التصدير
  const formattedData = data.map(item => ({
    name: `${item.firstName} ${item.lastName}`,
    email: item.email,
    phone: item.phone,
    status: item.status,
    registeredOn: new Date(item.registeredOn).toLocaleDateString()
  }));

  switch (format) {
    case 'pdf':
      const doc = new jsPDF();
      const headers = ['Name', 'Email', 'Phone', 'Status', 'Registered On'];
      const tableData = formattedData.map(item => Object.values(item));
      
      autoTable(doc, {
        head: [headers],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [0, 110, 40] },
      });
      
      doc.save(`employees_${type}_${new Date().toISOString()}.pdf`);
      break;

    case 'excel':
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(formattedData);
      XLSX.utils.book_append_sheet(wb, ws, 'Employees');
      XLSX.writeFile(wb, `employees_${type}_${new Date().toISOString()}.xlsx`);
      break;

    case 'csv':
      download(csvConfig)(generateCsv(csvConfig)(formattedData));
      break;

    case 'json':
      const jsonBlob = new Blob([JSON.stringify(formattedData, null, 2)], 
        { type: 'application/json' });
      const jsonUrl = URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement('a');
      jsonLink.href = jsonUrl;
      jsonLink.setAttribute('download', `employees_${type}_${new Date().toISOString()}.json`);
      document.body.appendChild(jsonLink);
      jsonLink.click();
      document.body.removeChild(jsonLink);
      URL.revokeObjectURL(jsonUrl);
      break;
  }
}; 