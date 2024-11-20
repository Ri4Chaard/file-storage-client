"use client";

import { Container } from "@/components/shared/container";
import { LoginForm } from "@/components/shared/form/auth/login-form";
import { Registration } from "@/components/shared/registration";
import { Button } from "@/components/ui/button";
import { useAuthPageStore } from "@/store/auth-page-store";
import { ChevronLeft, ChevronRight, Disc3 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
    {
        id: 1,
        image: "/assets/images/wp-3.jpg",
        title: "Оцифрування фотоплівок",
    },
    {
        id: 2,
        image: "/assets/images/wp-2.jpg",
        title: "Сканування від А6 до А0",
    },
    { id: 3, image: "/assets/images/wp-1.jpg", title: "Сканування документів" },
    {
        id: 4,
        image: "/assets/images/roll.jpg",
        title: "Сканування креслень та карт",
    },
    {
        id: 5,
        image: "/assets/images/videotapestodvd.jpg",
        title: "Цифрування відеокасет всіх типів",
    },
];

export default function Home() {
    const { data: session } = useSession();
    const { authType, onSwitchType, onChangeState } = useAuthPageStore();
    const [currentSlide, setCurrentSlide] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startInterval = () => {
        stopInterval();
        intervalRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
    };

    const stopInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        startInterval();
        return stopInterval;
    }, []);

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        startInterval();
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        startInterval();
    };

    if (useSession().status === "loading") {
        return (
            <Container className="flex items-center justify-center min-h-screen">
                <Disc3 className="w-5 h-5 animate-spin" />
            </Container>
        );
    }

    if (session) {
        if (session.user.role === "USER") {
            redirect(`/user/${session.user.id}`);
        } else if (session.user.role === "ADMIN") {
            redirect("/admin-dashboard");
        } else {
            redirect("/");
        }
    }

    return (
        <div className="flex gap-5 items-center justify-center min-h-screen">
            <div className="relative flex basis-2/3 min-h-screen overflow-hidden bg-black">
                <AnimatePresence>
                    {slides.map(
                        (slide, index) =>
                            index === currentSlide && (
                                <motion.div
                                    key={slide.id}
                                    className="absolute w-full h-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${slide.image})`,
                                    }}
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <motion.div
                                        className="absolute w-full h-full bg-black/40 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            delay: 0.3,
                                            duration: 0.8,
                                            ease: "easeInOut",
                                        }}
                                    >
                                        <h1 className="text-white text-4xl font-bold">
                                            {slide.title}
                                        </h1>
                                    </motion.div>
                                </motion.div>
                            )
                    )}
                </AnimatePresence>

                <Button
                    variant="secondary"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full"
                    onClick={handlePrevSlide}
                >
                    <ChevronLeft />
                </Button>
                <Button
                    variant="secondary"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full"
                    onClick={handleNextSlide}
                >
                    <ChevronRight />
                </Button>
            </div>

            <div className="basis-1/3 flex flex-col justify-center items-center px-5 z-10">
                {authType === "login" ? <LoginForm /> : <Registration />}
                <div className="flex items-center w-full my-5">
                    <span className="flex-1 border border-primary/10"></span>
                    <h2 className="text-sm mx-2 font-bold text-primary/50">
                        {authType === "login"
                            ? "Ще не зареєструвалися?"
                            : "Вже зареєструвалися?"}
                    </h2>
                    <span className="flex-1 border border-primary/10"></span>
                </div>
                <Button
                    variant="outline"
                    className="flex mb-5"
                    onClick={onSwitchType}
                >
                    {authType === "login" ? "Зареєструватися" : "Увійти"}
                </Button>

                {authType === "login" && (
                    <Button
                        variant="ghost"
                        className="flex"
                        onClick={() => {
                            onSwitchType();
                            onChangeState("password_restore");
                        }}
                    >
                        Забули пароль?
                    </Button>
                )}
            </div>
        </div>
    );
}
