import Link from 'next/link'
import React from 'react'

interface TxtLogoProps {
  logoSize?: string;
}
const TxtLogo = ({logoSize="text-4xl"}: TxtLogoProps) => {
  return (
    <Link href="/" className={`font-karantina text-accent ${logoSize} p-2`}>WearIT.</Link>
  )
}

export default TxtLogo