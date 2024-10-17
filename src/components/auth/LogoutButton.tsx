import { doLogout } from '@/lib/actions/auth.action'
import React from 'react'

import { FaSignOutAlt } from 'react-icons/fa'
import { Button } from '../ui/button'

const LogoutButton = () => {
  return (
    <form
        action={doLogout}
    >
        <Button
        variant="outline"
        className=" primary-foreground  bg-secondary-foreground flex items-center"
        type="submit"
      >
        <FaSignOutAlt className="mr-1" /> Logout
      </Button>
    </form>
  )
}
export default LogoutButton