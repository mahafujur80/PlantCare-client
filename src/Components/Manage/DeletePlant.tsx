"use client";

import { DeleteMyPlant } from "@/lib/PlantAction";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

interface DeletePlantBtnProps {
  id: string;
  userId: string;
  title: string;
}

export function DeletePlantBtn({id, userId, title}: DeletePlantBtnProps) {
    const router = useRouter();

    const handleDelete = async () => {
        const result = await DeleteMyPlant(userId, id);
        if (result.deletedCount === 1) {
            toast.success('Plant Deleted Successfully');
            router.refresh();
        } else {
            toast.error('Failed to delete plant');
        }
    };
  return (
    <AlertDialog>
      <Button  className="text-danger bg-white"><FaTrash /></Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete plant permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{title}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Plant
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}