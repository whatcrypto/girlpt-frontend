"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useUser } from "@clerk/nextjs"
import { Loader2, Crown, Zap, Infinity, CheckCircle } from "lucide-react"
import { CheckoutButton } from "./checkout-button"
import { pricingPlans } from "./checkout-button"
import { CheckoutButtonProps } from "./checkout-button"
import { PricingPlan } from "./checkout-button"

interface SubscriptionPopupProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SubscriptionPopup({ children, open, onOpenChange }: SubscriptionPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 6,
    seconds: 41
  })
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const actualOpen = open !== undefined ? open : isOpen
  const actualOnOpenChange = onOpenChange || setIsOpen

  return (
    <Dialog open={actualOpen} onOpenChange={actualOnOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-2xl lg:max-w-6xl max-h-[90vh] overflow-y-auto bg-background border-border p-4 sm:p-6">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-2">
            Choose Your Perfect Plan
          </DialogTitle>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-center sm:text-left">
              <div className="text-lg sm:text-xl font-bold text-foreground mb-1">
                Up to <span className="text-primary">75% OFF</span>
              </div>
              <div className="text-sm text-muted-foreground">Limited time offer</div>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-sm text-muted-foreground mb-1">Offer expires in</div>
              <div className="flex gap-1 text-lg sm:text-xl font-mono">
                <span className="bg-muted px-2 py-1 rounded text-foreground">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-muted-foreground">:</span>
                <span className="bg-muted px-2 py-1 rounded text-foreground">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-muted-foreground">:</span>
                <span className="bg-muted px-2 py-1 rounded text-foreground">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="flex gap-1 text-xs text-muted-foreground mt-1 justify-center sm:justify-end">
                <span>hr</span>
                <span className="ml-3">min</span>
                <span className="ml-2">sec</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl p-4 sm:p-6 border transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-primary bg-card ring-2 ring-primary/20 scale-105"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {/* Discount Badge */}
              <div className="absolute -top-3 left-4">
                <span className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  {plan.discountPercent}
                </span>
              </div>

              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 right-4">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center pt-4">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-6">
                  {plan.id === 'usage-based' ? (
                    <>
                      <span className="text-3xl sm:text-4xl font-bold text-foreground">${plan.price}</span>
                      <span className="text-muted-foreground text-base sm:text-lg">/token</span>
                      <div className="text-base sm:text-lg text-muted-foreground line-through mt-1">
                        ${plan.price}/token
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl sm:text-4xl font-bold text-foreground">${plan.price}</span>
                      {plan.interval && <span className="text-muted-foreground text-base sm:text-lg">/{plan.interval}</span>}
                      <div className="text-base sm:text-lg text-muted-foreground line-through mt-1">
                          ${plan.price}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {plan.marketingFeatureList.map((feature, index) => (
                  <li key={index} className="flex items-center text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <CheckoutButton
                plan={plan}
                className="w-full font-bold py-2 sm:py-3 rounded-lg text-sm sm:text-base"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-muted-foreground px-4">
          Having issues with payments?{" "}
          <a href="mailto:support@yourdomain.com" className="text-primary hover:text-primary/80 underline">
            Contact Support
          </a>
          <span className="ml-2">💬</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
