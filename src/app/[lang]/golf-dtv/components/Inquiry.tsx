'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Step {
  number: number
  label: string
}

interface InquiryData {
  title: string
  description: string
  steps: Step[]
  cta: string
}

export default function GolfDTVInquiry({ data }: { data: InquiryData }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    plan: '',
    addon: false,
    name: '',
    email: '',
    phone: '',
  })

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  return (
    <section id="inquiry" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-900/50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">{data.title}</h2>
          <p className="text-navy-400 text-base">{data.description}</p>
        </div>

        {/* Steps Progress */}
        <div className="mb-12">
          <div className="flex justify-between items-center gap-2 sm:gap-4">
            {data.steps.map((step, idx) => (
              <div key={step.number} className="flex-1">
                <div className="relative flex flex-col">
                  {/* Line connector */}
                  {idx < data.steps.length - 1 && (
                    <div
                      className={`absolute left-[calc(50%+24px)] top-6 w-[calc(100%-48px)] h-1 ${
                        currentStep > step.number ? 'bg-gold-500' : 'bg-navy-700'
                      }`}
                    />
                  )}

                  {/* Step circle */}
                  <button
                    onClick={() => {
                      if (step.number <= currentStep) {
                        setCurrentStep(step.number)
                      }
                    }}
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      currentStep >= step.number
                        ? 'bg-gold-500 text-navy-950'
                        : 'bg-navy-800 text-navy-400'
                    } ${step.number <= currentStep ? 'cursor-pointer hover:bg-gold-400' : 'cursor-default'}`}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </button>

                  {/* Label */}
                  <p className={`text-xs font-semibold mt-2 text-center ${
                    currentStep >= step.number ? 'text-gold-400' : 'text-navy-500'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-navy-900/50 border border-gold-500/20 rounded-2xl p-8 sm:p-12">
          {/* Step 1: Plan Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-gold-400 font-bold text-sm mb-4">ご希望のプランを選択してください</p>
                <div className="space-y-3">
                  {['Silver (20,000 THB)', 'Gold (50,000 THB)', 'Platinum (100,000 THB)'].map((plan) => (
                    <label key={plan} className="flex items-center gap-3 p-4 rounded-lg border border-gold-500/20 cursor-pointer hover:bg-white/5 transition-colors">
                      <input
                        type="radio"
                        name="plan"
                        value={plan}
                        checked={formData.plan === plan}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-gold-500"
                      />
                      <span className="text-navy-200 font-medium">{plan}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 p-4 rounded-lg border border-gold-500/20 cursor-pointer hover:bg-white/5 transition-colors">
                  <input
                    type="checkbox"
                    name="addon"
                    checked={formData.addon}
                    onChange={handleInputChange}
                    className="w-4 h-4 accent-gold-500"
                  />
                  <span className="text-navy-200 font-medium">申請代行プラン (+30,000 THB) を追加</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 2 & 3: Applicant Information */}
          {(currentStep === 2 || currentStep === 3) && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gold-400 font-semibold mb-2">お名前</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="山田太郎"
                  className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-gold-500/20 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gold-400 font-semibold mb-2">メールアドレス</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-gold-500/20 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-gold-400 font-semibold mb-2">電話番号（国番号付き）</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+81-90-1234-5678"
                  className="w-full px-4 py-3 rounded-lg bg-navy-950 border border-gold-500/20 text-white placeholder-navy-500 focus:outline-none focus:border-gold-500/50 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-gold-500/10 border border-gold-500/20">
                <p className="text-navy-200 text-sm leading-relaxed">
                  <span className="font-bold text-gold-400">入力内容の確認</span>
                </p>
                <div className="mt-4 space-y-3 text-sm text-navy-300">
                  <p><span className="font-semibold text-navy-200">プラン:</span> {formData.plan}</p>
                  {formData.addon && <p><span className="font-semibold text-navy-200">追加:</span> 申請代行プラン</p>}
                  <p><span className="font-semibold text-navy-200">お名前:</span> {formData.name}</p>
                  <p><span className="font-semibold text-navy-200">メール:</span> {formData.email}</p>
                  <p><span className="font-semibold text-navy-200">電話:</span> {formData.phone}</p>
                </div>
              </div>

              <p className="text-navy-400 text-sm">
                「送信」ボタンをクリックすると、担当者がご連絡させていただきます。決済はご相談後に別途ご案内します。
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3 px-4 rounded-lg border border-gold-500/30 text-gold-400 font-bold hover:bg-white/5 transition-colors"
              >
                戻る
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!formData.plan && currentStep === 1}
                className="flex-1 py-3 px-4 rounded-lg bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                次へ
              </button>
            ) : (
              <button className="flex-1 py-3 px-4 rounded-lg bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 transition-colors">
                送信する
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
