"use client";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { useForm } from "@mantine/form";

import Modal from "./Modal";
import MultiSelect from "./inputs/Multiselect";
import TextInput from "./inputs/TextInput";
import TextArea from "./inputs/TextArea";
import DateInput from "./inputs/DateInput";
import Checkbox from "./inputs/Checkbox";
import FileInput from "./inputs/FileInput";

import { handleUpload } from "@/lib/inputs/upload";
import { Project, ProjectFormValues, ProjectType } from "@/types/project";
import { useEffect, useState } from "react";
import { IconCircleCheckFilled, IconCircleXFilled, IconBrandGithubFilled, IconCalendar, IconFile, IconPhoto, IconAbc, IconHeading  } from "@tabler/icons-react";
import Tag from "./Tag";
import dayjs from "dayjs";
import { Toaster, toast } from "react-hot-toast";

const typeOptions = [
  "All",
  "Art",
  "Design",
  "Software",
  "Mechanical",
  "Electrical",
] as ProjectType[];

type ProjectFormProps = {
  projectModalOpen: boolean;
  setProjectModalOpen: (open: boolean) => void;
  projectUpdate: (project: Project) => void;
  data: ProjectFormValues;
  formTitle?: string;
  formDescription?: string;
  formType: "create" | "edit";
  projectId?: number;
};

export default function ProjectForm(props: ProjectFormProps) {
  const [projectFinished, setProjectFinished] = useState<boolean>(
    props.data.projectEnd ? false : true
  );

  const schema = z.object({
    projectName: z.string().min(1, "Project Name is required"),
    projectDescription: z.string().min(1, "Project Description is required"),
    projectTypes: z
      .array(z.enum(["Art", "Design", "Software", "Mechanical", "Electrical"]))
      .min(1, "At least one Project Type is required")
      .max(3, "At most 3 Project Types are allowed"),
    projectStart: z.date().optional(),
    projectEnd: z.date().optional(),
    projectFile: z.instanceof(File),
  });

  const form = useForm<ProjectFormValues>({
    validate: zodResolver(schema),
    initialValues: {
      projectName: "",
      projectDescription: "",
      projectTypes: [],
      projectStart: null,
      projectEnd: null,
      projectFile: null,
      projectGithub: null,
    },
  });

  const [isFileUploaded, setIsFileUploaded] = useState(false);

  useEffect(() => {
    if (props.data) {
      form.setValues({
        projectName: props.data.projectName || "",
        projectDescription: props.data.projectDescription || "",

        projectTypes: (props.data.projectTypes as ProjectType[]) || [],
        projectStart: props.data.projectStart || undefined,
        projectEnd: props.data.projectEnd || undefined,
        projectFile: props.data.projectFile || undefined,
        projectGithub: props.data.projectGithub || undefined,
      });

      setProjectFinished(props.data.projectEnd ? true : false);
    }
  }, [props.data]);

  
    const handleFileChange = (newFile: File) => {
    form.setFieldValue("projectFile", newFile); 
    setIsFileUploaded(false);
    };

  async function handleSubmit(values: ProjectFormValues) {
    const validationErrors = form.validate();
    if (validationErrors.hasErrors) {
      return;
    }
    try {
      let fileUrl;
      if (!isFileUploaded && values.projectFile) {
        const file = values.projectFile as File;
        fileUrl = await handleUpload(
          file,
          `project/${values.projectName.replaceAll(" ", "_")}.${
            file.type.split("/")[1]
          }`
        );
        setIsFileUploaded(true); 
      } else {
        fileUrl = values.projectFile as string;
      }

      values.projectFile = fileUrl as string;

      const formattedStartDate = values.projectStart
        ? dayjs(values.projectStart).format("MM/YYYY")
        : null;

      const formattedEndDate = values.projectEnd
        ? dayjs(values.projectEnd).format("MM/YYYY")
        : null;

      values.projectStart = formattedStartDate;
      values.projectEnd = formattedEndDate;
      

    
      if (props.formType === "edit" && props.projectId) {
        const updateResponse = await fetch(`/api/project/${props.projectId}/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });                     

        const updatedProject = await updateResponse.json();
        if (!updateResponse.ok) {
          toast.error("Failed to update project");
          throw new Error("Failed to update project");
        }
        toast.success("Project Updated!");
        console.log(updatedProject.project)
        props.projectUpdate(updatedProject);
      } else if (props.formType === "create") {
        const createResponse = await fetch("/api/project/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const createdProject = await createResponse.json();
        props.projectUpdate(createdProject.project);
        if (!createResponse.ok) {
          toast.error("Failed to create project");
          throw new Error("Failed to create project");
        }
        toast.success("Project Created!");
      }

      props.setProjectModalOpen(false);
    } catch (error) {
      console.error("Error handling the project submission:", error);
    }
  }

  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <Modal
      isOpen={props.projectModalOpen}
      setIsOpen={props.setProjectModalOpen}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(form.values);
        }}>
        <div className="flex flex-col items-start justify-center text-gray-500 gap-y-16">
          <div className="flex flex-col items-start justify-center gap-1">
            <span className="text-2xl font-extrabold text-zinc-700">
              {props.formType == "create" && "🚧 Create a new Project"}
              {props.formType == "edit" && "🚧 Update Project"}
            </span>
            <p className="font-medium text-gray-500">
              {props.formType == "create" &&
                "Fill in information below to add in a work or a project"}
              {props.formType == "edit" &&
                "Fill in information below to update a work or a project"}
            </p>
            <div className="w-full p-4 pb-0">
              <TextInput
                label="Project Name"
                placeholder="Enter a name"
                withAsterisk
                leftSection={<IconHeading size={16} />}
                {...form.getInputProps("projectName")}
              />
            </div>
            <div className="w-full p-4 pb-0 ">
              <TextArea
                label="Project Description"
                placeholder="Enter a description"
                withAsterisk
                leftSection={<IconAbc size={16} />}
                {...form.getInputProps("projectDescription")}
              />
            </div>
            <div className="w-full p-4 pb-0">
              <TextInput
                label="Project Github"
                placeholder="Enter a github link"
                leftSection={<IconBrandGithubFilled size={16} />}
                {...form.getInputProps("projectGithub")}
              />
            </div>
            <div className="w-full p-4 pb-0">
              <MultiSelect
                label="Project Types"
                placeholder="Select Types"
                withAsterisk
                data={typeOptions.filter((c) => c !== "All")}
                {...form.getInputProps("projectTypes")}
              />
            </div>
            <div className="w-full p-4 pb-0 ">
              <DateInput
                label="Project Start"
                placeholder="Select a Start Date"
                leftSection={<IconCalendar size={16} />}
                {...form.getInputProps("projectStart")}
              />
            </div>
            {projectFinished && (
              <div className="w-full px-4">
                <DateInput
                  label="Project End"
                  placeholder="Select a End Date"
                  leftSection={<IconCalendar size={16} />}
                  {...form.getInputProps("projectEnd")}
                />
              </div>
            )}
            <div className="w-full p-4 pb-0 ">
              <Checkbox
                label={"Project Finished?"}
                checked={projectFinished}
                setChecked={setProjectFinished}
              />
            </div>

            <div className="w-full p-4 pb-0 ">
              <FileInput
                fileType="image/*"
                withAsterisk
                leftSection={<IconPhoto size={16} />}
                file={
                  typeof props.data.projectFile === "string"
                    ? props.data.projectFile
                    : undefined
                }
                onFileChange={handleFileChange}
                {...form.getInputProps("projectFile")}
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-end w-full gap-3">
            {props.formType === "create" && (
              <Tag
                hover_bg_color="hover:bg-green-200"
                bg_color="bg-green-50"
                txt_color="text-green-500">
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center gap-2">
                  <IconCircleCheckFilled size={16} />
                  Add
                </button>
              </Tag>
            )}
            {props.formType === "edit" && (
              <Tag
                hover_bg_color="hover:bg-yellow-200"
                bg_color="bg-yellow-50"
                txt_color="text-yellow-500">
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center gap-2">
                  <IconCircleCheckFilled size={16} />
                  Update
                </button>
              </Tag>
            )}
            <Tag
              hover_bg_color="hover:bg-red-200"
              bg_color="bg-red-50"
              txt_color="text-red-500">
              <button
                type="reset"
                onClick={() => {
                  props.setProjectModalOpen(false);
                }}
                className="flex flex-row items-center justify-center gap-2">
                <IconCircleXFilled size={16} />
                Cancel
              </button>
            </Tag>
          </div>
        </div>
      </form>
    </Modal>
    </>
  );
}
