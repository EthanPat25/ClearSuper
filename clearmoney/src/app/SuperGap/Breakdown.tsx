import React from "react";
import { MoneyBag } from "../AnimationComponents/MoneyBag";
import { motion } from "motion/react";

const Breakdown = () => {
  return (
    <>
      <div className=" flex flex-col items-center w-full">
        <motion.div
          className=" flex flex-col items-center w-[93%] bg-[RGB(82,105,127)] h-[13rem] md:h-56 rounded-2xl relative"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            scale: { type: "spring", visualDuration: 0.5, bounce: 0.4 },
          }}
        >
          <div className="bg-white rounded-full h-20 w-20 justify-center items-center flex absolute left-5 top-5">
            <img
              alt=""
              className="h-12 w-12"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgNDI2LjQwMyA0MjYuNDAzIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIj48Zz48cGF0aCBkPSJNMjEzLjIwMyAyNDcuNDY5Yy0yOC40NTQgMC01MS41MiAyMy4wNjYtNTEuNTIgNTEuNTJzMjMuMDY2IDUxLjUyIDUxLjUyIDUxLjUyIDUxLjUyLTIzLjA2NiA1MS41Mi01MS41MmMtLjAzOC0yOC40MzgtMjMuMDgyLTUxLjQ4Mi01MS41Mi01MS41MnptOCA4Ny42djIuNTZhOCA4IDAgMCAxLTE2IDB2LTIuNTZhMjUuNDk4IDI1LjQ5OCAwIDAgMS0xNC44OC0xMC41NiA4LjAxNSA4LjAxNSAwIDAgMSAxMy42LTguNDggMTEuMDM3IDExLjAzNyAwIDAgMCA5LjI4IDQuMjRjOC41NiAwIDE0LjgtNy43NiA1LjA0LTEyLjMyYTIyLjI4NCAyMi4yODQgMCAwIDAtNi4wOC0xLjEyIDMzLjg3OSAzMy44NzkgMCAwIDEtMTEuNzYtMi44Yy0xOS42LTkuNzYtMTYuODgtMzQuOTYgNC44LTQxLjEydi0yLjU2YTggOCAwIDAgMSAxNiAwdjIuNTZhMjYuMjE0IDI2LjIxNCAwIDAgMSAxNC42NCAxMC4xNiA4LjAzMiA4LjAzMiAwIDAgMS0yLjQ1OSAxMS4wOTEgOC4wMzMgOC4wMzMgMCAwIDEtMTAuOTgxLTIuMjkxIDEwLjg5MyAxMC44OTMgMCAwIDAtOS4yLTQuMTZjLTguNjQgMC0xNC4zMiA3LjY4LTUuNjggMTJhMjAuMDU5IDIwLjA1OSAwIDAgMCA2LjI0IDEuMiAzMi45OTIgMzIuOTkyIDAgMCAxIDExLjM2IDIuNTZjMjAuODggOS44MzkgMTcuNzYgMzUuNDM5LTMuOTIgNDEuNnoiIGZpbGw9IiMwMGI1YjciIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvcGF0aD48cGF0aCBkPSJtMzM4LjY0MyAyMzQuNTg5LTIwLjQ4IDE5LjA0YTE5LjY3IDE5LjY3IDAgMCAxLTI0LjQgMi4xNmwtMTQ4LjE2LTEwMC42NGMtNC42NCA0LjU2LTkuMjggOS40NC0xMy43NiAxNC40OC02LjQgNy4yLTg3Ljc2IDEwNy42LTU5LjA0IDE3Mi4xNiAxOC4xNiA0MC43MiA3OS4zNiA1MS41MiAxNDAuNDggNTEuMDQgNTcuNjgtLjQ4IDExMy42LjcyIDEzNS42OC0zNi40OCAyMC4wOC0zMy44NCA5LjItODEuMjAxLTEwLjMyLTEyMS43NnptLTEyNS40NCAxMzEuOTJjLTM3LjI5IDAtNjcuNTItMzAuMjMtNjcuNTItNjcuNTJzMzAuMjMtNjcuNTIgNjcuNTItNjcuNTIgNjcuNTIgMzAuMjMgNjcuNTIgNjcuNTJjLS4wNjQgMzcuMjYzLTMwLjI1NiA2Ny40NTYtNjcuNTIgNjcuNTJ6IiBmaWxsPSIjMDBiNWI3IiBvcGFjaXR5PSIxIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIj48L3BhdGg+PHBhdGggZD0iTTQyNi40MDMgMjYxLjM4OGEzLjE0MyAzLjE0MyAwIDAgMS0zLjA4NCAzLjJoLS4wMzZsLTM4LjE2LS42NGEuOTU0Ljk1NCAwIDAgMS0uNzItMS42bDEwLjE2LTEwLjE2LTQ3LjI4LTQzLjA0YTMuNzA0IDMuNzA0IDAgMCAwLTUuMDQuMTZsLTExLjI4IDEwLjQ4LTIzLjY4IDIyLjE2YTMuNzUzIDMuNzUzIDAgMCAxLTQuNzIuNGwtMTQ1LjA0LTk4LjQ4LTQzLjc2LTI5LjY4LTI5LjkyIDI5Ljg0YTIuMzI5IDIuMzI5IDAgMCAxLTIuODguNGwtNzguNjQtNDYuNTZhNC4xNzEgNC4xNzEgMCAwIDEtMS45Mi0zLjI4bC0uNC0zMS41MmExLjU3OSAxLjU3OSAwIDAgMSAyLjQtMS40NGw3OC4xNiA0Ni4yNCAyOS44NC0yOS44NGEyLjQxMiAyLjQxMiAwIDAgMSAzLjA0LS4yNGw2OS4wNCA0Ni44OCAxMTguMDggODAuMjRhMy44NSAzLjg1IDAgMCAwIDQuNzItLjRsMTAuMzItOS42OCAyNC42NC0yMy4wNGEzLjg5NSAzLjg5NSAwIDAgMSA1LjEyLS4xNmw2Ny45MiA2MS44NCAxMC0xMGEuOTY5Ljk2OSAwIDAgMSAxLjY4LjY0eiIgZmlsbD0iIzAwYjViNyIgb3BhY2l0eT0iMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCI+PC9wYXRoPjxwYXRoIGQ9Ik0yNzEuMjAzIDc0LjkwOGEyNTIuMTA2IDI1Mi4xMDYgMCAwIDAtMTIuMDggMzIuNjQgNy45NzEgNy45NzEgMCAwIDEtMi4wOCAzLjQ0IDc0LjQ2NSA3NC40NjUgMCAwIDAtNDAuMjQtMTQuNzJoLS44YTc1LjMxIDc1LjMxIDAgMCAwLTMyLjggOS42bC0yNC4wOC0xNi40Yy00LjcyLTEzLjEyLTkuODQtMjYuNjQtMTkuNjgtMzEuNjgtOS4wNC00LjcyIDcuMTItMTYuOTYgMTYuNTYtMjIuMDggMTMuODQtNy42OCAyMi4zMiA3LjYgNDkuNTIgOC44OCAyMC4wOCAxLjA0IDI1LjM2LTUuMiA1Ny45Mi02LjA4IDIzLjA0LS42NCAyNS40NCA0LjI0IDI1LjkyIDUuNiAyLjA4IDYuMDgtOC44OCAxMi44LTE4LjE2IDMwLjh6TTMwNC4wODMgMTc5LjM4OGMtMjkuOTItMzcuMjgtNjMuMi02Ny42LTg3Ljg0LTY3LjEyYTQ5LjcwNCA0OS43MDQgMCAwIDAtMTcuNiA0bDEwMi44IDY5Ljg0IDQuNTYtNC4yNGMtLjU2LS43OTktMS4yOC0xLjY4LTEuOTItMi40OHoiIGZpbGw9IiMwMGI1YjciIG9wYWNpdHk9IjEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiPjwvcGF0aD48L2c+PC9zdmc+"
            />
          </div>
          <MoneyBag responsiveSizing="w-[7rem] h-[7rem] md:w-[8rem] md:h-[8rem]"></MoneyBag>
          <p className="text-sm text-[RGB(251,99,64)] font-semibold">
            By Age 60 thats a Gap of
          </p>
          <h2 className="font-bold text-[2.5rem] md:text-[3rem] text-white p-3 pt-0 ">
            $22,000
          </h2>
        </motion.div>
      </div>

      <motion.div
        className="bg-white rounded-3xl shadow-md w-[93%] text-center mt-5 h-[20rem]"
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 14,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
      >
        {/* Header with a bottom border */}
        <div className="p-6 pb-0 w-full border-solid border-[RGB(246,246,249)] border-b">
          <h1 className="mb-4 text-left text-lg font-bold">
            Detailed Breakdown
          </h1>
        </div>
        <div className="p-6 pt-0">
          {/* Projected Super if continuously working */}
          <div className="mt-4 flex justify-between">
            <h2 className="text-left">
              Projected Super (If You Never Take a Break)
            </h2>
            <h2 className="text-left">$350,000</h2>
          </div>
          {/* Projected Super with Time Off */}
          <div className="mt-4 flex justify-between">
            <h2 className="text-left">
              Projected Super (After Taking Time Off)
            </h2>
            <h2 className="text-left">$330,000</h2>
          </div>
          {/* Nominal contributions that weren't made */}
          {/* Additional loss due to missed compounding */}
          <div className="mt-4 flex justify-between">
            <h2 className="text-left">
              Missed Contributions (Not Made During the Break)
            </h2>
            <h2 className="text-left">$10,000</h2>
          </div>
          {/* Percentage reduction */}
          <div className="mt-4 flex justify-between">
            <h2 className="text-left">Percentage Reduction</h2>
            <h2 className="text-left">5.7% lower</h2>
          </div>
          {/* Separator */}
          <hr className="w-full border-[RGB(246,246,249)] my-4" />
          {/* Final Outcome */}
          <div className="mt-4 flex justify-between">
            <h2 className="text-left font-bold text-lg text-[RGB(251,99,64)]">
              Projected Super Gap
            </h2>
            <h2 className="text-left font-bold text-lg text-[RGB(251,99,64)]">
              $22,000
            </h2>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Breakdown;
