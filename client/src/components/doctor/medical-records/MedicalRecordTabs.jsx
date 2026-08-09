import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MedicalRecordOverview } from './MedicalRecordOverview';
import { MedicalHistoryTimeline } from './MedicalHistoryTimeline';
import { ConsultationHistory } from './ConsultationHistory';
import { DiagnosisHistory } from './DiagnosisHistory';
import { PrescriptionHistory } from './PrescriptionHistory';
import { LabReportHistory } from './LabReportHistory';
import { VitalsHistory } from './VitalsHistory';
import { AllergyHistory } from './AllergyHistory';
import { ClinicalNotes } from './ClinicalNotes';

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'history', label: 'Medical History' },
  { value: 'consultations', label: 'Consultations' },
  { value: 'diagnoses', label: 'Diagnoses' },
  { value: 'prescriptions', label: 'Prescriptions' },
  { value: 'labs', label: 'Lab Reports' },
  { value: 'vitals', label: 'Vitals' },
  { value: 'allergies', label: 'Allergies' },
  { value: 'notes', label: 'Clinical Notes' },
];

export function MedicalRecordTabs({
  patient,
  patientTimeline,
  consultations,
  diagnoses,
  prescriptions,
  labReports,
  vitalsHistory,
  allergyDetails,
  clinicalNotes,
  isLoading,
  onViewConsultation,
  onAddNoteForRecord,
  onViewPrescription,
  onViewReport,
  onAddClinicalNote,
}) {
  return (
    <Tabs defaultValue="overview">
      <div className="overflow-x-auto">
        <TabsList className="w-max min-w-full sm:w-fit">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="overview" className="mt-4">
        <MedicalRecordOverview patient={patient} consultations={consultations} labReports={labReports} />
      </TabsContent>

      <TabsContent value="history" className="mt-4">
        <MedicalHistoryTimeline
          consultations={consultations}
          diagnoses={diagnoses}
          patientTimeline={patientTimeline}
          isLoading={isLoading}
        />
      </TabsContent>

      <TabsContent value="consultations" className="mt-4">
        <ConsultationHistory
          consultations={consultations}
          isLoading={isLoading}
          onViewConsultation={onViewConsultation}
          onAddNote={onAddNoteForRecord}
        />
      </TabsContent>

      <TabsContent value="diagnoses" className="mt-4">
        <DiagnosisHistory diagnoses={diagnoses} isLoading={isLoading} />
      </TabsContent>

      <TabsContent value="prescriptions" className="mt-4">
        <PrescriptionHistory prescriptions={prescriptions} isLoading={isLoading} onViewPrescription={onViewPrescription} />
      </TabsContent>

      <TabsContent value="labs" className="mt-4">
        <LabReportHistory labReports={labReports} isLoading={isLoading} onViewReport={onViewReport} />
      </TabsContent>

      <TabsContent value="vitals" className="mt-4">
        <VitalsHistory vitalsHistory={vitalsHistory} isLoading={isLoading} />
      </TabsContent>

      <TabsContent value="allergies" className="mt-4">
        <AllergyHistory allergyDetails={allergyDetails} isLoading={isLoading} />
      </TabsContent>

      <TabsContent value="notes" className="mt-4">
        <ClinicalNotes notes={clinicalNotes} isLoading={isLoading} onAddNote={onAddClinicalNote} />
      </TabsContent>
    </Tabs>
  );
}
