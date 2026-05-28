"use client";
import { FormFieldWrapper } from "@/components/shared/FormFieldWrapper";
import { useEffect, useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, XCircle } from "lucide-react";
import axios from "axios";
import getImageKey from "@/lib/getImageKey";

export default function UploadImage({
  form,
  image,
  label,name

}: {
  name: string;
  label: string;
  form: any;
  image: string | undefined;
}) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    image,
  );
   
  useEffect(()=>{
    if(imageUrl){
      const val = name === "images" ? [imageUrl] : imageUrl;
      form.setValue(name, val, {shouldValidate:true,shouldDirty:true,shouldTouch:true})
    } else {
      const emptyVal = name === "images" ? [] : "";
      form.setValue(name, emptyVal, {shouldValidate:true,shouldDirty:true,shouldTouch:true})
    }
  },[imageUrl, form, name])
  
  const [isImageDeleting, setIsImageDeleting] = useState(false);
   
  const handleDeleteImage = async (image: string) => {
    try { 
      setIsImageDeleting(true);
      if(!imageUrl){
        toast.error("No image to delete");
        return;
      }
      const imageId = getImageKey(image);
      await axios.post(`/api/uploadthing/delete`, { ImageKey: imageId }).then((res)=>{
        setImageUrl("");
        const emptyVal = name === "images" ? [] : "";
        form.setValue(name, emptyVal);
        toast.success("Image deleted successfully");
      }).catch((error)=>{
        toast.error("Failed to delete image");
      })
    }finally {
      setIsImageDeleting(false);
    }
 
  }


  return (
    <FormFieldWrapper
      control={form.control}
      name={name}  
      label={label}
      description={`Please upload your ${label}`}
    >
      {(formField) => {
        return imageUrl ? (
          <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
            <Image
              fill
              src={imageUrl}
              alt="Hotel Image"
              className="object-contain"
            />
            <Button onClick={()=>{handleDeleteImage(imageUrl)}} type="button" size="icon" variant="ghost" className="absolute right-[-12px] top-0">{isImageDeleting ? <Loader2 /> : <XCircle />}</Button>
          </div>
        ) : (
          <div className="flex flex-col items-center max-w-[4000px] p-12 border-2 border-dashed border-primary/50 rouded mt-4">
            <UploadButton
              endpoint={"imageUploader"}
              onClientUploadComplete={(res) => {
                setImageUrl(res?.[0]?.ufsUrl);
                toast.success("Image uploaded successfully");
              }}
              onUploadError={(error: Error) => {
                toast.error(`Upload error: ${error.message}`);
              }}
            />
          </div>
        );
      }}
    </FormFieldWrapper>
  );
}
