import { toast } from 'sonner';
import { Download, Eye, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ReportAttachment({ attachment, reportId }) {
  if (!attachment) return null;

  const handleView = () => {
    toast.info(`Opening ${attachment.name}`, {
      description: 'Attachment preview requires an authorized laboratory portal session.',
    });
  };

  const handleDownload = () => {
    const blob = new Blob(
      [`MediCore Hospital — Lab Report Attachment\nReport: ${reportId}\nFile: ${attachment.name}\nType: ${attachment.type}\n`],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="rounded-xl border-border shadow-sm">
      <CardContent className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
            <FileText className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Report Attachment</p>
            <p className="text-xs text-slate-500">
              {attachment.name} · {attachment.type}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleView}>
            <Eye /> View
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download /> Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
