"use client"

import React from "react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    const generatePages = () => {
        const pages: (number | string)[] = []

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }

            return pages
        }

        pages.push(1)

        if (currentPage > 4) {
            pages.push("...")
        }

        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (currentPage < totalPages - 3) {
            pages.push("...")
        }

        pages.push(totalPages)

        return pages
    }

    const pages = generatePages()

    return (
        <div className="flex md:items-center md:justify-center gap-2 py-6">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex items-center justify-center rounded-md h-8 w-8 md:h-10 md:w-10 border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {"<"}
            </button>

            <ul className="flex items-center gap-2">
                {pages.map((page, index) => (
                    <li key={`${page}-${index}`}>
                        {page === "..." ? (
                            <span className="px-1">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className={`h-8 w-8 md:h-10 md:w-10 text-sm rounded-md border transition ${
                                    currentPage === page
                                        ? "bg-blue-500 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center justify-center rounded-md h-8 w-8 md:h-10 md:w-10 border px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {">"}
            </button>
        </div>
    )
}

export default Pagination
