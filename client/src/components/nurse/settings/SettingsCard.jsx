import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SettingsCard({ title, description, action, children, footer, className = '', contentClassName = 'px-5 py-5' }) {
  return (
    <Card className={`gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm ${className}`}>
      {(title || description || action) && (
        <CardHeader className="flex flex-row items-start justify-between border-b border-border px-5 py-5">
          <div>
            {title && <CardTitle className="text-base font-semibold">{title}</CardTitle>}
            {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
          </div>
          {action}
        </CardHeader>
      )}
      {children && <CardContent className={contentClassName}>{children}</CardContent>}
      {footer && <div className="border-t border-border px-5 py-4">{footer}</div>}
    </Card>
  );
}
