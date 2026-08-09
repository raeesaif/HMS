import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, CalendarClock, ClipboardList, RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doctorPatients } from '@/data/doctorPatients';
import { doctorPrescriptions } from '@/data/doctorPrescriptions';
import { getMedicalRecords, medicalRecordsByPatient } from '@/data/doctorMedicalRecords';
import { downloadPrescription, printPrescription } from '@/lib/prescriptionPrint';
import { MedicalRecordStatsCard } from '@/components/doctor/medical-records/MedicalRecordStatsCard';
import { PatientSearch } from '@/components/doctor/medical-records/PatientSearch';
import { PatientRecordHeader } from '@/components/doctor/medical-records/PatientRecordHeader';
import { MedicalAlerts } from '@/components/doctor/medical-records/MedicalAlerts';
import { MedicalRecordTabs } from '@/components/doctor/medical-records/MedicalRecordTabs';
import { AddClinicalNoteDialog } from '@/components/doctor/medical-records/AddClinicalNoteDialog';
import { RecordDetailsSheet } from '@/components/doctor/medical-records/RecordDetailsSheet';
import { PrescriptionDetailsSheet } from '@/components/doctor/prescriptions/PrescriptionDetailsSheet';
import { EmptyState } from '@/shared/EmptyState';
import { StatsRowSkeleton, HeaderSkeleton } from '@/components/doctor/medical-records/LoadingSkeleton';

function isWithinNextDays(dateString, days) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  const limit = new Date();
  limit.setDate(today.getDate() + days);
  return date >= today && date <= limit;
}

function isWithinLastDays(dateString, days) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  const start = new Date();
  start.setDate(today.getDate() - days);
  return date >= start && date <= today;
}

const DoctorMedicalRecords = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [recordDetails, setRecordDetails] = useState(null);
  const [recordDetailsOpen, setRecordDetailsOpen] = useState(false);
  const [activePrescription, setActivePrescription] = useState(null);
  const [prescriptionSheetOpen, setPrescriptionSheetOpen] = useState(false);

  const patientPrescriptions = useMemo(
    () => (selectedPatient ? doctorPrescriptions.filter((rx) => rx.patientId === selectedPatient.id) : []),
    [selectedPatient]
  );

  const prescriptionHistory = useMemo(
    () =>
      selectedPatient
        ? doctorPrescriptions.filter((rx) => rx.patientId === selectedPatient.id && rx.id !== activePrescription?.id)
        : [],
    [selectedPatient, activePrescription]
  );

  const stats = useMemo(() => {
    const allConsultations = Object.values(medicalRecordsByPatient).flatMap((record) => record.consultations);
    return {
      totalRecords: doctorPatients.length,
      recentConsultations: allConsultations.filter((consultation) => isWithinLastDays(consultation.date, 14)).length,
      pendingFollowUps: allConsultations.filter(
        (consultation) => consultation.followUpDate && isWithinNextDays(consultation.followUpDate, 30)
      ).length,
      criticalRecords: doctorPatients.filter((patient) => patient.status === 'Critical').length,
    };
  }, []);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setIsLoading(true);
    setMedicalRecords(getMedicalRecords(patient.id));
    setTimeout(() => setIsLoading(false), 600);
  };

  const handleRefresh = () => {
    if (!selectedPatient) return;
    setIsLoading(true);
    setTimeout(() => {
      setMedicalRecords(getMedicalRecords(selectedPatient.id));
      setIsLoading(false);
      toast.success('Medical record refreshed');
    }, 500);
  };

  const handleAddClinicalNote = (patientId, noteData) => {
    const now = new Date();
    const newNote = {
      id: `NOTE-${Date.now()}`,
      noteType: noteData.noteType,
      author: selectedPatient.assignedDoctor,
      date: now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      content: noteData.content,
      followUpInstructions: noteData.followUpInstructions,
      attachments: noteData.attachments,
    };
    setMedicalRecords((current) => ({ ...current, clinicalNotes: [newNote, ...current.clinicalNotes] }));
  };

  const handleViewConsultation = (consultation) => {
    setRecordDetails({
      recordType: 'Consultation',
      date: consultation.date,
      doctor: consultation.doctor,
      diagnosis: consultation.diagnosis,
      treatment: consultation.treatmentPlan,
      clinicalNotes: consultation.clinicalNotes,
      relatedPrescription: '—',
      relatedLabReport: '—',
      followUpInstructions: consultation.followUpDate ? `Follow-up scheduled for ${consultation.followUpDate}` : '—',
    });
    setRecordDetailsOpen(true);
  };

  const handleViewReport = (lab) => {
    setRecordDetails({
      recordType: 'Lab Report',
      date: lab.testDate,
      doctor: lab.doctor,
      diagnosis: '—',
      treatment: `${lab.testName}: ${lab.result}`,
      clinicalNotes: `Reference range: ${lab.referenceRange}`,
      relatedPrescription: '—',
      relatedLabReport: lab.testName,
      followUpInstructions: '—',
    });
    setRecordDetailsOpen(true);
  };

  const handleViewPrescription = (prescription) => {
    setActivePrescription(prescription);
    setPrescriptionSheetOpen(true);
  };

  const handlePrescriptionAction = (action, prescription) => {
    if (action === 'print-prescription') printPrescription(prescription);
    if (action === 'download-prescription') {
      downloadPrescription(prescription);
      toast.success(`${prescription.id} downloaded`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card px-5 py-5 shadow-sm lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Medical Records</h1>
          <p className="mt-1 text-sm text-slate-500">Review and manage clinical records for your patients.</p>
        </div>
        {selectedPatient && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="w-full sm:w-72">
              <PatientSearch onSelect={handleSelectPatient} placeholder="Change patient..." />
            </div>
            <Button variant="outline" size="icon" onClick={handleRefresh} aria-label="Refresh medical record">
              <RefreshCw className="size-4" />
            </Button>
          </div>
        )}
      </section>

      {isLoading ? (
        <StatsRowSkeleton />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MedicalRecordStatsCard
            icon={Users}
            tone="blue"
            title="Total Patient Records"
            value={stats.totalRecords}
            description="Patients under your clinical care"
          />
          <MedicalRecordStatsCard
            icon={ClipboardList}
            tone="green"
            title="Recent Consultations"
            value={stats.recentConsultations}
            description="Consultations in the last 14 days"
          />
          <MedicalRecordStatsCard
            icon={CalendarClock}
            tone="amber"
            title="Pending Follow-ups"
            value={stats.pendingFollowUps}
            description="Follow-ups due within 30 days"
          />
          <MedicalRecordStatsCard
            icon={AlertTriangle}
            tone="red"
            title="Critical Records"
            value={stats.criticalRecords}
            description="Patients marked as critical"
          />
        </section>
      )}

      {!selectedPatient ? (
        <div className="rounded-xl border border-border bg-card px-5 py-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Find a patient</h2>
          <p className="mt-1 text-sm text-slate-500">Search by patient name, ID, or phone number to open their record.</p>
          <div className="mt-4">
            <PatientSearch onSelect={handleSelectPatient} />
          </div>
          <div className="mt-6">
            <EmptyState
              icon={Users}
              title="No patient selected."
              description="Search for a patient above to view their medical record."
            />
          </div>
        </div>
      ) : isLoading ? (
        <HeaderSkeleton />
      ) : (
        <>
          <PatientRecordHeader patient={selectedPatient} />
          <MedicalAlerts patient={selectedPatient} allergyDetails={medicalRecords?.allergyDetails ?? []} />

          <div className="rounded-xl border border-border bg-card px-5 py-5 shadow-sm">
            <MedicalRecordTabs
              patient={selectedPatient}
              patientTimeline={selectedPatient.timeline}
              consultations={medicalRecords?.consultations ?? []}
              diagnoses={medicalRecords?.diagnoses ?? []}
              prescriptions={patientPrescriptions}
              labReports={medicalRecords?.labReports ?? []}
              vitalsHistory={medicalRecords?.vitalsHistory ?? []}
              allergyDetails={medicalRecords?.allergyDetails ?? []}
              clinicalNotes={medicalRecords?.clinicalNotes ?? []}
              isLoading={isLoading}
              onViewConsultation={handleViewConsultation}
              onAddNoteForRecord={() => setAddNoteOpen(true)}
              onViewPrescription={handleViewPrescription}
              onViewReport={handleViewReport}
              onAddClinicalNote={() => setAddNoteOpen(true)}
            />
          </div>
        </>
      )}

      <AddClinicalNoteDialog
        patient={selectedPatient}
        open={addNoteOpen}
        onOpenChange={setAddNoteOpen}
        onSave={handleAddClinicalNote}
      />

      <RecordDetailsSheet record={recordDetails} open={recordDetailsOpen} onOpenChange={setRecordDetailsOpen} />

      <PrescriptionDetailsSheet
        prescription={activePrescription}
        history={prescriptionHistory}
        open={prescriptionSheetOpen}
        onOpenChange={setPrescriptionSheetOpen}
        onAction={handlePrescriptionAction}
        onSelectHistory={setActivePrescription}
      />
    </div>
  );
};

export default DoctorMedicalRecords;
