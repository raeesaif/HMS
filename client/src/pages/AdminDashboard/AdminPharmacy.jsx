import PageHeader from '@/shared/PageHeader';
import InventoryTable from '@/shared/InventoryTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { PHARMACY_SUMMARY, inventoryData } from '@/data/pharmacy';

const AdminPharmacy = () => {
  return (
    <div className="min-h-screen bg-slate-100 -m-4 sm:-m-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Pharmacy & Inventory"
          subtitle="Track stock levels, expiry and reorder thresholds"
        />
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline">Reorder list</Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add item
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {PHARMACY_SUMMARY.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.06)]"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{item.value}</p>
            <span
              className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${item.badge}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
              Live
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <InventoryTable data={inventoryData} />
      </div>
    </div>
  );
};

export default AdminPharmacy;
