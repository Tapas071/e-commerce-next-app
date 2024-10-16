import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddItemsForm } from "@/components/AddItemsForm";
import { PlusCircle } from "lucide-react";

const AddProductForm = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Products
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-card text-card-foreground">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-semibold mb-4">
            Add New Product
          </AlertDialogTitle>
          <div className="bg-popover p-6 rounded-lg shadow-md">
            <AddItemsForm />
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddProductForm;
