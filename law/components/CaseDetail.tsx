import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

type CaseDetailProps = {
  initialClassName?: string;
  initialStartMonth?: Date;
  initialEndMonth?: Date;
  classId?: number;
}

export type CaseDetailHandle = {
    saveCaseDetails: () => Promise<number | void>;
  }

const CaseDetail = forwardRef<CaseDetailHandle, CaseDetailProps>(({ 
  initialClassName = '', 
  initialStartMonth, 
  initialEndMonth,
  classId,
}, ref) => {
  const [className, setClassName] = useState(initialClassName);
  const [startMonth, setStartMonth] = useState<Date | undefined>(initialStartMonth);
  const [endMonth, setEndMonth] = useState<Date | undefined>(initialEndMonth);
  const [isClassNameChanged, setIsClassNameChanged] = useState(false);
  const [isDateChanged, setIsDateChanged] = useState(false);

  const isNewClass = !classId;
  useEffect(() => {
    setClassName(initialClassName);
    setStartMonth(initialStartMonth);
    setEndMonth(initialEndMonth);
  }, [initialClassName,initialStartMonth,initialEndMonth]);
  
  

  useEffect(() => {
    setIsClassNameChanged(className !== initialClassName);
  }, [className, initialClassName]);

  useEffect(() => {
    setIsDateChanged(
      startMonth?.toISOString() !== initialStartMonth?.toISOString() ||
      endMonth?.toISOString() !== initialEndMonth?.toISOString()
    );
  }, [startMonth, endMonth, initialStartMonth, initialEndMonth]);   

  const saveCaseDetails = async () => {
    if (!(className.trim() !== '' && startMonth !== undefined && endMonth !== undefined)) {
        toast.error("Please fill in all required fields");
        return;
      }
    
      if (startMonth && endMonth && startMonth > endMonth) {
        toast.info("End month should be greater than start month");
        return;
      }

    // const supabase = createClient();

    if (isNewClass) {
      // Add new class
      // const { data, error } = await supabase
      //   .from('class')
      //   .insert({
      //     name: className,
      //     session: [startMonth.toISOString(), endMonth.toISOString()],
      //     school_id: schoolId
      //   })
      //   .select();

      // if (error) {
      //   console.error(error);
      //   toast.error("Error adding new class");
      //   return;
      // }

      toast.success("New class added successfully");
      // You might want to return the new class ID here
      // return data[0].id;
    } else {
      // Update existing class
      if (isClassNameChanged) {
        // const { error } = await supabase
        //   .from('class')
        //   .update({ name: className })
        //   .eq('id', classId);

        // if (error) {
        //   console.error(error);
        //   toast.error("Error updating class name");
        //   return;
        // }
      }

      if (isDateChanged && startMonth && endMonth) {
        // const { error } = await supabase
        //   .from('class')
        //   .update({ 
        //     session: [startMonth.toISOString(), endMonth.toISOString()]
        //   })
        //   .eq('id', classId);

        // if (error) {
        //   console.error(error);
        //   toast.error("Error updating class session");
        //   return;
        // }
      }

      toast.success("Class details updated successfully");
    }
  }

  useImperativeHandle(ref, () => ({
    saveCaseDetails
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isNewClass ? 'Class Details' : 'Edit Class Details'}</CardTitle>
        <CardDescription>
          {isNewClass ? 'Add a new class and session details' : 'Edit class name and session details'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Class name"
              type="text"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="session">Session</Label>

          </div>
        </div>
      </CardContent>
    </Card>
  )
})

CaseDetail.displayName = 'CaseDetail';

export default CaseDetail;