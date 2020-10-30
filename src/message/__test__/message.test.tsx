import React from "react";
import { render, act, waitFor } from "@testing-library/react";
// import { act } from "@testing-library/test-utils";


import message from "../index";

describe("Test Component", () => {

    beforeEach(() => {
    });

    it("has success/warn/info/warn/config methods", () => {
        const desirMessage = {
            success: expect.anything(),
            info: expect.anything(),
            warn: expect.anything(),
            error: expect.anything(),
            config: expect.anything(),
        }
        expect(message).toEqual(desirMessage);
    });

    it("should have primary className with default props", async () => {

        message.success('hahaha', {
            TEST_RENDER: (node) => {
                const { baseElement, getByTestId } = render(node);
            }
        })

        await waitFor(() => {
            const testComponent = document.querySelector('.zw-message');
            expect(testComponent).toHaveClass('zw-message');
        })
    });

});