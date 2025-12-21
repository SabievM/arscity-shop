"use client"
import React, { ReactNode } from "react"

type Props = {
    text: string
    icon?: ReactNode
    backgroundColor?: string
    colorText?: string
    className?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onClickCapture?: (e: React.MouseEvent<HTMLButtonElement>) => void
    variant?: "primary" | "secondary" | "ghost"
    size?: "sm" | "md" | "lg"
}

const Button: React.FC<Props> = ({
    text,
    backgroundColor,
    colorText,
    className = "",
    icon,
    onClick,
    onClickCapture,
    variant = "primary",
    size = "md",
}) => {
    const baseStyles =
        "inline-flex items-center justify-center gap-3 font-medium transition-all duration-300 rounded-xl"

    const variantStyles = {
        primary:
            "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
        secondary:
            "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-500 hover:text-red-500",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800",
    }

    const sizeStyles = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    }

    // Support legacy props
    const legacyStyles =
        backgroundColor || colorText
            ? `${backgroundColor || ""} ${colorText || ""}`
            : variantStyles[variant]

    return (
        <button
            onClick={onClick}
            onClickCapture={onClickCapture}
            className={`${baseStyles} ${sizeStyles[size]} ${legacyStyles} ${className}`}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span>{text}</span>
        </button>
    )
}

export default Button
