import type { BlindTest } from "~/types/eyeTest.type";

interface eyeTestState {
  colorBlindTesQuestions: BlindTest[];
}

export const useEyeTestStore = defineStore("eyeTestStore", {
  state: (): eyeTestState => {
    return {
      colorBlindTesQuestions: [
        {
          image: "soal-1.png",
          options: [
            {
              label: 12,
              value: "normal",
            },
            {
              label: 10,
              value: "total",
            },
            {
              label: 5,
              value: "total",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-2.png",
          options: [
            {
              label: 8,
              value: "normal",
            },
            {
              label: 3,
              value: "red-green deficiency",
            },
            {
              label: 5,
              value: "total",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-3.png",
          options: [
            {
              label: 70,
              value: "red-green deficiency",
            },
            {
              label: 29,
              value: "normal",
            },
            {
              label: 8,
              value: "total",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-4.png",
          options: [
            {
              label: 7,
              value: "total",
            },
            {
              label: 5,
              value: "normal",
            },
            {
              label: 2,
              value: "red-green deficiency",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-5.png",
          options: [
            {
              label: 2,
              value: "total",
            },
            {
              label: 5,
              value: "red-green deficiency",
            },
            {
              label: 3,
              value: "normal",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-6.png",
          options: [
            {
              label: 19,
              value: "total",
            },
            {
              label: 17,
              value: "red-green deficiency",
            },
            {
              label: 15,
              value: "normal",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-7.png",
          options: [
            {
              label: 24,
              value: "total",
            },
            {
              label: 21,
              value: "red-green deficiency",
            },
            {
              label: 74,
              value: "normal",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-8.png",
          options: [
            {
              label: 24,
              value: "red-green deficiency",
            },
            {
              label: 7,
              value: "red-green deficiency",
            },
            {
              label: 6,
              value: "normal",
            },
            {
              label: "Tidak ada apapun",
              value: "red-green deficiency",
            },
          ],
        },
        {
          image: "soal-9.png",
          options: [
            {
              label: 34,
              value: "red-green deficiency",
            },
            {
              label: 45,
              value: "normal",
            },
            {
              label: 73,
              value: "red-green deficiency",
            },
            {
              label: "Tidak ada apapun",
              value: "red-green deficiency",
            },
          ],
        },
        {
          image: "soal-10.png",
          options: [
            {
              label: 3,
              value: "red-green deficiency",
            },
            {
              label: 5,
              value: "normal",
            },
            {
              label: 7,
              value: "red-green deficiency",
            },
            {
              label: "Tidak ada apapun",
              value: "red-green deficiency",
            },
          ],
        },
        {
          image: "soal-11.png",
          options: [
            {
              label: 5,
              value: "red-green deficiency",
            },
            {
              label: 73,
              value: "normal",
            },
            {
              label: 53,
              value: "red-green deficiency",
            },
            {
              label: "Tidak ada apapun",
              value: "red-green deficiency",
            },
          ],
        },
        {
          image: "soal-12.png",
          options: [
            {
              label: 5,
              value: "red-green deficiency",
            },
            {
              label: 73,
              value: "total",
            },
            {
              label: 53,
              value: "total",
            },
            {
              label: "Tidak ada apapun",
              value: "normal",
            },
          ],
        },
        {
          image: "soal-13.png",
          options: [
            {
              label: 45,
              value: "red-green deficiency",
            },
            {
              label: 73,
              value: "total",
            },
            {
              label: 53,
              value: "total",
            },
            {
              label: "Tidak ada apapun",
              value: "normal",
            },
          ],
        },
        {
          image: "soal-14.png",
          options: [
            {
              label: 6,
              value: "Protanopia",
            },
            {
              label: 2,
              value: "Deuteranopia",
            },
            {
              label: 26,
              value: "normal",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-15.png",
          options: [
            {
              label: 2,
              value: "Protanopia",
            },
            {
              label: 4,
              value: "Deuteranopia",
            },
            {
              label: 42,
              value: "normal",
            },
            {
              label: "Tidak ada apapun",
              value: "total",
            },
          ],
        },
        {
          image: "soal-16.png",
          options: [
            {
              label: 12,
              value: "total",
            },
            {
              label: 4,
              value: "total",
            },
            {
              label: "Sebuah garis",
              value: "red-green deficiency",
            },
            {
              label: "Tidak ada apapun",
              value: "normal",
            },
          ],
        },
        {
          image: "soal-17.png",
          options: [
            {
              label: "Tidak ada apapun",
              value: "total",
            },
            {
              label: 9,
              value: "total",
            },
            {
              label: "Sebuah garis merah ungu",
              value: "red-green deficiency",
            },
            {
              label: "Garis biru kehijauan",
              value: "normal",
            },
          ],
        },
        {
          image: "soal-18.png",
          options: [
            {
              label: "Garis biru dan ungu",
              value: "red-green deficiency",
            },
            {
              label: 9,
              value: "total",
            },
            {
              label: 0,
              value: "total",
            },
            {
              label: "Garis ungu dan jingga",
              value: "normal",
            },
          ],
        },
      ],
    };
  },
});
