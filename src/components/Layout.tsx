import { FunctionComponent, ReactElement, useContext } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContext } from "@/extensions/toast";
import { ToastMessageType } from "./models/ToastMessageType";
import ToastCard from "./Card/ToastCard";
// import Inter from 'next/font';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }): ReactElement => {

    const toastContext = useContext(ToastContext);

    return (
        <>
        <ToastCard
            visibility={toastContext?.toastOptions?.visible ?? false}
            title={toastContext?.toastOptions?.title ?? 'Welcome'}
            description={toastContext?.toastOptions?.description ?? ''}
            messageType={toastContext?.toastOptions?.type ?? ToastMessageType.Info}
            timeout={toastContext?.toastOptions?.timeout ?? 0.01} />

            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap"
                />
            </Head>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}

export default Layout;