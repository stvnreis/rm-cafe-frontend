'use client'

import { Button } from "@nextui-org/react";
import { Api } from "../lib/axios";
import { useSnackbar } from "notistack";
import { useState } from "react";

export default function AdminPage() {
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)

  const handleBackup = async () => {
    try {
      setIsLoading(true)
      enqueueSnackbar('Seu backup está sendo gerado!', {
        autoHideDuration: 1000
      })

      const {data} = await Api.get('api/backup')

      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 2000
      })
    } catch (err: any) {
      enqueueSnackbar(err.response.data.message, {
        variant: 'error',
        autoHideDuration: 2000
      })
    } finally {
      setIsLoading(false)
    }
    
  }

  return <div className="w-full flex justify-center">
    <Button
      color="primary"
      className="opacity-80 text-white"
      onClick={() => handleBackup()}
      isDisabled={isLoading}
    >
      Gerar Backup
    </Button>
  </div>
}