import Head from "next/head"
import { Author } from "@/types";
import { useEffect, useState } from "react";
import AuthorForm from "@/components/authors/authorForm";

 const Create: React.FC = () => {
    return(
        <>
            <div>
                <AuthorForm />
            </div>
        </>
    )
 }

 export default Create;