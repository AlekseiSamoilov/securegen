import { render, screen } from '@testing-library/react'
import { PasswordDisplay } from '../PasswordDisplay'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import '@testing-library/jest-dom'

vi.mock('../StrengthMeter', () => ({
    StrengthMeter: ({ password }: { password: string }) =>
        password ? <div data-testid="strength-meter">Strength: {password.length}</div> : null
}))

describe('PasswordDisplay', () => {
    const mockPassword = 'TestPassword123!'

    beforeEach(() => {
        // Clear mocks before each test
        vi.clearAllMocks()
    })

    describe('Состояние без пароля', () => {
        it('Должен показывать плейсхолдер когда пароль пустой', () => {
            render(<PasswordDisplay password='' />)

            expect(screen.getByText(/Нажмите Генерировать для создания пароля/)).toBeInTheDocument()
            expect(screen.queryByRole('button')).not.toBeInTheDocument()
        })

        it('не должен рендерить StrengthMeter без пароля', () => {
            render(<PasswordDisplay password='' />)

            expect(screen.queryAllByTestId('strength-meter')).not.toBeInTheDocument()
        })
    })

    describe('Состояние с паролем', () => {
        it('должен отображать пароль в code элементе', () => {
            render(<PasswordDisplay password={mockPassword} />)

            const passwordElement = screen.getByText(mockPassword)
            expect(passwordElement).toBeInTheDocument()
            expect(passwordElement.tagName).toBe('CODE')
        })

        it('должен показывать кнопку копирования', () => {
            render(<PasswordDisplay password={mockPassword} />)

            expect(screen.getByTestId('strength-meter')).toBeInTheDocument();
            expect(screen.getByText(`Strength: ${mockPassword.length}`)).toBeInTheDocument();
        })
    })

})