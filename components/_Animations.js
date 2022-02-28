// sidemenu transitions
export const _Transition_SideMenu_Overlay = {
    initial: {
        opacity: 0,
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1]
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.25,
            ease: [1, 0, 0.8, 0]
        }
    },
}
export const _Transition_SideMenu_Content = {
    initial: {
        x: '-100vw',
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        x: 0,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1]
        }
    },
    exit: {
        x: '-100vw',
        transition: {
            duration: 0.25,
            ease: [1, 0, 0.8, 0]
        }
    },
}

// page transitions
export const _Transition_Page = {
    initial: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1]
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.25,
            ease: [1, 0, 0.8, 0]
        }
    }
}

// hero page transitions
export const _Transition_HeroPage = {
    initial: {
        opacity: 0,
        scale: 1.05,
        originX: 1,
        originY: 0.5,
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        opacity: 1,
        scale: 1,
        originX: 1,
        originY: 0.5,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1]
        }
    },
    exit: {
        opacity: 0,
        scale: 1.1,
        originX: 1,
        originY: 0.5,
        transition: {
            duration: 0.25,
            ease: [1, 0, 0.8, 0]
        }
    }
}

// bottom menu animation
export const _Transition_BottomMenu = {
    initial: {
        opacity: 0,
        y: 100,
        transition: {
            duration: 0,
        }
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.2, 1, 0, 1]
        }
    },
    exit: {
        opacity: 0,
        y: 100,
        transition: {
            duration: 0.25,
            ease: [1, 0, 0.8, 0]
        }
    }
}

// card transitions
export const _Transition_Card = {
    initial: {
        opacity: 0,
        translateY: 50,
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        opacity: 1,
        translateY: 0,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1],
            delay: 0.25
        }
    },
}

// blob transitions
export const _Transition_Blob_Top = {
    initial: {
        clipPath: "circle(0% at 0% 0%)",
        opacity: 0,
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        clipPath: "circle(50% at 0% 0%)",
        opacity: 0.5,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1]
        }
    },
    exit: {
        clipPath: "circle(40% at 0% 0%)",
        opacity: 0,
        transition: {
            duration: 0.25,
            ease: [1, 0, 0.8, 0]
        }
    }
}
export const _Transition_Blob_Bottom = {
    initial: {
        clipPath: "circle(0% at 80% 0%)",
        opacity: 0,
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        clipPath: "circle(60% at 80% 0%)",
        opacity: 0.5,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1]
        }
    },
    exit: {
        clipPath: "circle(40% at 100% 0%)",
        opacity: 0,
        transition: {
            duration: 0.25,
            ease: [1, 0, 0.8, 0]
        }
    }
}
export const _Transition_Blob_Left = {
    initial: {
        clipPath: "circle(0% at 0% 50%)",
        opacity: 0,
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        clipPath: "circle(70% at 0% 50%)",
        opacity: 0.5,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1]
        }
    },
    exit: {
        clipPath: "circle(0% at 0% 50%)",
        opacity: 0,
        transition: {
            duration: 0.25,
            ease: [1, 0, 0.8, 0]
        }
    }
}

// slide transitions
export const _Transition_Slide_Left = {
    initial: {
        x: 100,
        opacity: 0,
        transition: {
            duration: 0,
            ease: [0.2, 1, 0, 1]
        }
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.75,
            ease: [0.2, 1, 0, 1],
            delay: 0.25
        }
    },
}