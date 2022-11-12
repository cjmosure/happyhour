<script lang="ts">
  import TailwindCss from './lib/TailwindCSS.svelte'
  import { onMount } from 'svelte'
  import { swipe } from 'svelte-gestures'
  import swipeImg from './assets/swipe.svg'
  import { fade } from 'svelte/transition'

  interface Question {
    _id: string
    title: string
    description: string
    __v: number
  }

  let currentQuestionIndex = 0
  let questions: Question[] = []
  let showSwipeIndicator = true
  let ranOutOfQuestions = false

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++
    } else if (ranOutOfQuestions) {
      currentQuestionIndex = 0
      ranOutOfQuestions = false
    } else {
      ranOutOfQuestions = true
    }
  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) currentQuestionIndex--
  }

  const getQuestions = () => {
    fetch('/api/questions')
      .then(response => response.json())
      .then(data => {
        questions = [...data]
      }).catch(error => {
        console.error(error)
      });
  }

  const dislikeQuestion = () => {
    fetch(`/api/questions/${questions[currentQuestionIndex]?._id}/dislike`, {
      method: 'PUT',
      credentials: 'include',
    })
    nextQuestion()
  }

  const onSwipe = (event) => {
    if (event.detail.direction === 'left') {
      nextQuestion()
    } else if (event.detail.direction === 'right') {
      previousQuestion()
    }
  }

  onMount(() => {
    getQuestions()
    setTimeout(() => {
      showSwipeIndicator = false
    }, 2000)
  })

</script>

<TailwindCss />
<main use:swipe={{ timeframe: 300, minSwipeDistance: 100, touchAction: 'pan-y' }} on:swipe={onSwipe}>
  <div class="question">
    {#if showSwipeIndicator}
      <div out:fade class="swipe-indicator">
        <img src={swipeImg} alt="Swipe left and right to browse questions" />
        <!-- Swipe through questions -->
      </div>
    {/if}
    {#if !ranOutOfQuestions}
      <h2>{questions[currentQuestionIndex] && questions[currentQuestionIndex].title}</h2>
    {:else}
      <h2>I've ran out of questions... Click the New Question button to restart.</h2>
    {/if}
  </div>
  <div class="actions">
    <button class="new-question" on:click={() => nextQuestion()}>New Question</button>
    <button class="dislike-question" on:click={() => dislikeQuestion()}>This Question is Dumb</button>
  </div>
</main>

<style lang="postcss">
  main {
    @apply h-full w-full flex flex-col p-4;
  }

  @-webkit-keyframes swinging{
    0%{-webkit-transform: rotate(10deg);}
    50%{-webkit-transform: rotate(-5deg)}
    100%{-webkit-transform: rotate(10deg);}
  }

  @keyframes swinging{
    0%{transform: rotate(10deg);}
    50%{transform: rotate(-5deg)}
    100%{transform: rotate(10deg);}
  }

  .swipe-indicator {
    @apply absolute text-center flex items-center flex-col opacity-50;
    top: 5rem;
  }

  .swipe-indicator img {
    @apply mb-2;
    -webkit-transform-origin: 50% 0;
    transform-origin: bottom center;
    -webkit-animation: swinging 3.5s ease-in-out forwards infinite;
    animation: swinging 3.5s ease-in-out forwards infinite;
  }

  .question {
    @apply grow flex content-center items-center text-center justify-center;
  }

  .question h2 {
    @apply text-3xl font-bold m-0 drop-shadow-lg;
    user-select: none;
    @screen md {
      @apply text-5xl;
    }
  }

  .actions {
    @apply flex flex-col;
    @screen md {
      @apply flex-row;
    }

  }

  button.new-question {
    @apply flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 mb-4 px-8 py-3 text-base font-medium text-indigo-700;
    @screen md {
      @apply py-4 px-10 text-lg mb-0 mr-4;
    }
  }

  button.dislike-question {
    @apply flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white;
    @screen md {
      @apply py-4 px-10 text-lg;
    }
  }

</style>
