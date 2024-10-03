"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProfileForm } from "@/components/AddItemsForm";

const AddProductForm = () => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>Add Products</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <ProfileForm/>
            
            <AlertDialogTitle></AlertDialogTitle>
            <AlertDialogDescription>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
export default AddProductForm;
