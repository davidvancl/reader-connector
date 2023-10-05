// @ts-nocheck

import React from 'react';
import QuickActionComponent from "@components/elements/QuickActionComponent"
import { render, screen } from '@testing-library/react';

describe('Test component: QuickActionComponent', () => {
    it('Test: renders correctly with data', async () => {
        let eventClick = 0;

        render(
            <QuickActionComponent
                title='Reload extension'
                actionTitle='Reload'
                description='Reloads extension with background workers'
                icon={ }
                callback={() => { eventClick++ }}
            />
        );

        // Checks body
        const body = screen.getByTestId("action-body");
        expect(body).toBeDefined();

        // Checks title
        const title = screen.getByTestId("action-title");
        expect(title).toHaveTextContent("Reload extension");

        // Checks button and callback
        const button = screen.getByTestId("action-button");
        expect(button).toHaveTextContent("Reload");
        expect(eventClick).toBe(0);
        button.click(button);
        button.click(button);
        expect(eventClick).toBe(2);

        // Checks description
        const description = screen.getByTestId("action-description");
        expect(description).toHaveTextContent("Reloads extension with background workers");
    });

    it('Test: empty render and optional parameters', async () => {
        render(
            <QuickActionComponent title='Reload extension' />
        );

        // Checks body
        const body = screen.getByTestId("action-body");
        expect(body).toBeDefined();

        // Checks title
        const title = screen.getByTestId("action-title");
        expect(title).toHaveTextContent("Reload extension");

        // Checks button and callback
        expect(screen.findByTestId("action-button")).resolves.toBe({});

        // Checks description
        const description = screen.getByTestId("action-description");
        expect(description).toHaveTextContent("");
    });
});