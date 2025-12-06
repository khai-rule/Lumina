"use client";

import { useState } from "react";
import Icon from "@/components/ui/AppIcon";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

interface ProjectBasicInfo {
  projectName: string;
  description: string;
  startDate: string;
  estimatedEndDate: string;
  budget: string;
  teamSize: string;
}

interface ProjectBasicInfoFormProps {
  data: ProjectBasicInfo;
  onUpdate: (data: ProjectBasicInfo) => void;
}

const ProjectBasicInfoForm = ({
  data,
  onUpdate,
}: ProjectBasicInfoFormProps) => {
  const [formData, setFormData] = useState<ProjectBasicInfo>(data);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectBasicInfo, string>>
  >({});

  const handleChange = (field: keyof ProjectBasicInfo, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateField = (field: keyof ProjectBasicInfo) => {
    const value = formData[field];
    if (!value || value.trim() === "") {
      setErrors({ ...errors, [field]: "This field is required" });
      return false;
    }
    return true;
  };

  return (
    <div className='space-y-6'>
      <div className='bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start space-x-3'>
        <Icon
          name='InformationCircleIcon'
          size={20}
          className='text-primary flex-shrink-0 mt-0.5'
        />
        <div>
          <p className='text-sm text-foreground font-medium'>Getting Started</p>
          <p className='text-sm text-muted-foreground mt-1'>
            Provide basic information about your project. This will help
            structure your SDLC journey and enable AI-powered recommendations.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='lg:col-span-2'>
          <label
            htmlFor='projectName'
            className='block text-sm font-medium text-foreground mb-2'
          >
            Project Name <span className='text-error'>*</span>
          </label>
          <Input
            type='text'
            id='projectName'
            value={formData.projectName}
            onChange={(e) => handleChange("projectName", e.target.value)}
            onBlur={() => validateField("projectName")}
            placeholder='e.g., E-Commerce Mobile Application'
            className={errors.projectName ? "border-error" : ""}
          />
          {errors.projectName && (
            <p className='text-sm text-error mt-1 flex items-center'>
              <Icon name='ExclamationCircleIcon' size={14} className='mr-1' />
              {errors.projectName}
            </p>
          )}
          <p className='text-xs text-muted-foreground mt-1'>
            Choose a clear, descriptive name that reflects the project&apos;s
            purpose
          </p>
        </div>

        <div className='lg:col-span-2'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-foreground mb-2'
          >
            Project Description <span className='text-error'>*</span>
          </label>
          <Textarea
            id='description'
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            onBlur={() => validateField("description")}
            placeholder="Describe the project's goals, target audience, and key features..."
            rows={4}
            maxLength={500}
            className={`resize-none ${errors.description ? "border-error" : ""}`}
          />
          {errors.description && (
            <p className='text-sm text-error mt-1 flex items-center'>
              <Icon name='ExclamationCircleIcon' size={14} className='mr-1' />
              {errors.description}
            </p>
          )}
          <div className='flex items-center justify-between mt-1'>
            <p className='text-xs text-muted-foreground'>
              Provide a comprehensive overview of what you&apos;re building
            </p>
            <p className='text-xs text-muted-foreground'>
              {formData.description.length}/500
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor='startDate'
            className='block text-sm font-medium text-foreground mb-2'
          >
            Start Date <span className='text-error'>*</span>
          </label>
          <Input
            type='date'
            id='startDate'
            value={formData.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            onBlur={() => validateField("startDate")}
            className={errors.startDate ? "border-error" : ""}
          />
          {errors.startDate && (
            <p className='text-sm text-error mt-1 flex items-center'>
              <Icon name='ExclamationCircleIcon' size={14} className='mr-1' />
              {errors.startDate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='estimatedEndDate'
            className='block text-sm font-medium text-foreground mb-2'
          >
            Estimated End Date <span className='text-error'>*</span>
          </label>
          <Input
            type='date'
            id='estimatedEndDate'
            value={formData.estimatedEndDate}
            onChange={(e) => handleChange("estimatedEndDate", e.target.value)}
            onBlur={() => validateField("estimatedEndDate")}
            className={errors.estimatedEndDate ? "border-error" : ""}
          />
          {errors.estimatedEndDate && (
            <p className='text-sm text-error mt-1 flex items-center'>
              <Icon name='ExclamationCircleIcon' size={14} className='mr-1' />
              {errors.estimatedEndDate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='budget'
            className='block text-sm font-medium text-foreground mb-2'
          >
            Budget (USD)
          </label>
          <div className='relative'>
            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground'>
              $
            </span>
            <Input
              type='text'
              id='budget'
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              placeholder='10,000'
              className='pl-8'
            />
          </div>
          <p className='text-xs text-muted-foreground mt-1'>
            Optional: Estimated project budget
          </p>
        </div>

        <div>
          <label
            htmlFor='teamSize'
            className='block text-sm font-medium text-foreground mb-2'
          >
            Team Size
          </label>
          <select
            id='teamSize'
            value={formData.teamSize}
            onChange={(e) => handleChange("teamSize", e.target.value)}
            className='w-full px-4 py-2.5 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-default'
          >
            <option value=''>Select team size</option>
            <option value='1'>Solo (1 person)</option>
            <option value='2-5'>Small (2-5 people)</option>
            <option value='6-10'>Medium (6-10 people)</option>
            <option value='11-20'>Large (11-20 people)</option>
            <option value='20+'>Enterprise (20+ people)</option>
          </select>
          <p className='text-xs text-muted-foreground mt-1'>
            Helps tailor recommendations to your team structure
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectBasicInfoForm;
