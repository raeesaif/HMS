import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Puzzle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/shared/SearchInput';
import { FilterDropdown } from '@/shared/FilterDropdown';
import { FilterBar } from '@/components/super-admin/FilterBar';
import { ErrorState } from '@/components/super-admin/ErrorState';
import { FiltersSkeleton, TableSkeleton } from '@/components/super-admin/LoadingSkeleton';
import { FeaturesTable } from '@/components/super-admin/features/FeaturesTable';
import { CreateFeatureDialog } from '@/components/dialogs/super-admin/CreateFeatureDialog';
import { EditFeatureDialog } from '@/components/dialogs/super-admin/EditFeatureDialog';
import { FeatureDetailsDialog } from '@/components/dialogs/super-admin/FeatureDetailsDialog';
import { useFeatures, useCreateFeature, useUpdateFeature, useEnableFeature, useDisableFeature } from '@/hooks/superAdmin/useFeatures';
import { featureCategoryOptions, featureStatusOptions } from '@/data/superAdmin/features';

const Features = () => {
  const { data: features = [], isLoading, isError, refetch } = useFeatures();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const [activeFeature, setActiveFeature] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);

  const createFeature = useCreateFeature();
  const updateFeature = useUpdateFeature();
  const enableFeature = useEnableFeature();
  const disableFeature = useDisableFeature();

  const filteredFeatures = useMemo(() => {
    const query = search.trim().toLowerCase();
    return features.filter((feature) => {
      const matchesSearch = !query || feature.name.toLowerCase().includes(query) || feature.description.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || feature.category === category;
      const matchesStatus = status === 'all' || feature.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [features, search, category, status]);

  const handleClearFilters = () => {
    setSearch('');
    setCategory('all');
    setStatus('all');
  };

  const closeDialog = (next) => {
    if (!next) setOpenDialog(null);
  };

  const handleAction = (action, feature) => {
    setActiveFeature(feature);
    if (action === 'enable') {
      enableFeature.mutate(feature.id, { onSuccess: () => toast.success(`${feature.name} enabled`) });
      return;
    }
    if (action === 'disable') {
      disableFeature.mutate(feature.id, { onSuccess: () => toast.success(`${feature.name} disabled`) });
      return;
    }
    setOpenDialog(action);
  };

  const handleCreate = (payload) => createFeature.mutate(payload);
  const handleEdit = (featureId, payload) => updateFeature.mutate({ featureId, payload });

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Features</h1>
          <p className="mt-1 text-sm text-slate-500">Control which platform features are available and to which plans.</p>
        </div>
        <Button onClick={() => setOpenDialog('create')}>
          <Puzzle /> Create Feature
        </Button>
      </section>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <Card className="gap-0 overflow-hidden rounded-xl border-border py-0 shadow-sm">
          <div className="border-b border-border p-5">
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FilterBar>
                <SearchInput value={search} onChange={setSearch} placeholder="Search features..." className="sm:w-64" />
                <FilterDropdown label="Category" value={category} onChange={setCategory} options={featureCategoryOptions.map((o) => ({ value: o, label: o }))} />
                <FilterDropdown label="Status" value={status} onChange={setStatus} options={featureStatusOptions.map((o) => ({ value: o, label: o }))} />
              </FilterBar>
            )}
          </div>

          {isLoading ? (
            <TableSkeleton rows={8} cols={7} />
          ) : (
            <FeaturesTable features={filteredFeatures} onAction={handleAction} onClearFilters={handleClearFilters} />
          )}
        </Card>
      )}

      <CreateFeatureDialog open={openDialog === 'create'} onOpenChange={closeDialog} onSave={handleCreate} />
      <EditFeatureDialog feature={activeFeature} open={openDialog === 'edit'} onOpenChange={closeDialog} onSave={handleEdit} />
      <FeatureDetailsDialog feature={activeFeature} open={openDialog === 'view'} onOpenChange={closeDialog} />
    </div>
  );
};

export default Features;
