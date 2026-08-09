export const bedStatusOptions = ['Available', 'Occupied', 'Reserved', 'Maintenance'];
export const bedTypeOptions = ['General', 'Semi-Private', 'Private', 'ICU', 'CCU'];
export const admissionTypeOptions = ['Planned', 'Emergency', 'Transfer'];

export const beds = [
  { id: 'BED-101', bedNumber: '101-A', ward: 'General Ward', room: '101', floor: '1st Floor', type: 'General', status: 'Occupied', patientId: 'PT-1042', patientName: 'Ali Ahmed', admissionDate: '07 Aug 2026', admissionType: 'Planned', assignedBy: 'Neha Kapoor' },
  { id: 'BED-102', bedNumber: '101-B', ward: 'General Ward', room: '101', floor: '1st Floor', type: 'General', status: 'Available', patientId: null, patientName: null, admissionDate: null, admissionType: null, assignedBy: null },
  { id: 'BED-103', bedNumber: '104-A', ward: 'General Ward', room: '104', floor: '1st Floor', type: 'Semi-Private', status: 'Reserved', patientId: 'PT-1156', patientName: 'Ayesha Raza', admissionDate: '10 Aug 2026', admissionType: 'Planned', assignedBy: 'Neha Kapoor' },
  { id: 'BED-201', bedNumber: '201-A', ward: 'Private Wing', room: '201', floor: '2nd Floor', type: 'Private', status: 'Occupied', patientId: 'PT-1121', patientName: 'Bilal Khan', admissionDate: '06 Aug 2026', admissionType: 'Planned', assignedBy: 'Neha Kapoor' },
  { id: 'BED-202', bedNumber: '202-A', ward: 'Private Wing', room: '202', floor: '2nd Floor', type: 'Private', status: 'Maintenance', patientId: null, patientName: null, admissionDate: null, admissionType: null, assignedBy: null },
  { id: 'ICU-04', bedNumber: 'ICU-04', ward: 'ICU', room: 'ICU', floor: 'Ground Floor', type: 'ICU', status: 'Occupied', patientId: 'PT-0921', patientName: 'Kamran Ali', admissionDate: '04 Aug 2026', admissionType: 'Emergency', assignedBy: 'Front Desk — Night Shift' },
  { id: 'ICU-05', bedNumber: 'ICU-05', ward: 'ICU', room: 'ICU', floor: 'Ground Floor', type: 'ICU', status: 'Available', patientId: null, patientName: null, admissionDate: null, admissionType: null, assignedBy: null },
  { id: 'CCU-02', bedNumber: 'CCU-02', ward: 'CCU', room: 'CCU', floor: 'Ground Floor', type: 'CCU', status: 'Available', patientId: null, patientName: null, admissionDate: null, admissionType: null, assignedBy: null },
];

export const bedStats = {
  total: beds.length,
  available: beds.filter((bed) => bed.status === 'Available').length,
  occupied: beds.filter((bed) => bed.status === 'Occupied').length,
  reserved: beds.filter((bed) => bed.status === 'Reserved').length,
  maintenance: beds.filter((bed) => bed.status === 'Maintenance').length,
};

export const wardOptions = [...new Set(beds.map((bed) => bed.ward))];
export const floorOptions = [...new Set(beds.map((bed) => bed.floor))];
