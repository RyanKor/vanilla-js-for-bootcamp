<script>
  //   export let name;
  let strength = 0;
  let validations = [];

  let showPassword = false;
  function validatePassword(e) {
    const password = e.target.value;
    validations = [
      password.length > 5,
      password.search(/[A-Z]/) > -1,
      password.search(/[0-9]/) > -1,
      password.search(/[$&+,;:=?@#]/) > -1
    ];
    strength = validations.reduce((acc, cur) => acc + cur);
  }
</script>

<style>
  form {
    --text-color: #afafaf;
    max-width: 500px;
  }
  .field {
    width: 100%;
    position: relative;
    border-bottom: 2px dashed var(--text-color);
    margin: 4rem auto 1rem;
  }
  .label {
    color: var(--text-color);
    font-size: 1.2rem;
  }
  .input {
    outline: none;
    border: none;
    overflow: hidden;
    margin: 0;
    width: 100%;
    padding: 0.25rem 0;
    background: none;
    font-size: 1.2rem;
    font-weight: bold;
  }
  .input:valid {
    color: yellowgreen;
  }
  .input:invalid {
    color: orangered;
  }
  .field::after {
    content: "";
    position: relative;
    display: block;
    height: 4px;
    width: 100%;
    background: #d16dff;
    transform: scaleX(0);
    transform-origin: 0%;
    transition: transform 500ms ease;
  }
  .field:focus-within {
    border-color: transparent;
  }
  .field:focus-within::after {
    transform: scaleX(1);
  }
  .label {
    z-index: -1;
    position: absolute;
    transform: translateY(-2rem);
    transform-origin: 0%;
    transition: transform 400ms;
  }
  .field:focus-within .label,
  .input:not(:placeholder-shown) + .label {
    transform: scale(0.8) translateY(-5rem);
  }
  .strength {
    display: flex;
    height: 20px;
    width: 100%;
  }
  .bar {
    margin-right: 5px;
    height: 100%;
    width: 25%;
    transition: box-shadow 500ms;
    box-shadow: inset 0px 20px #1f1f1f;
  }
  .bar-show {
    box-shadow: none;
  }
  .bar-1 {
    background: linear-gradient(to right, red, orangered);
  }
  .bar-2 {
    background: linear-gradient(to right, orangered, yellow);
  }
  .bar-3 {
    background: linear-gradient(to right, yellow, yellowgreen);
  }
  .bar-4 {
    background: linear-gradient(to right, yellow, green);
  }
  .toggle-password {
    position: absolute;
    cursor: help;
    font-size: 0.8rem;
    right: 0.25rem;
    bottom: 0.5rem;
  }
</style>

<main>
  <form>
    <div class="field">
      <input type="email" name="email" class="input" placeholder="" />
      <label for="email" class="label">Email</label>
    </div>

    <div class="field">
      <input
        type={showPassword ? 'text' : 'password'}
        class="input"
        placeholder=""
        on:input={validatePassword} />
      <label for="password" class="label">password</label>
      <span
        class="toggle-password"
        on:mouseenter={() => (showPassword = true)}
        on:mouseleave={() => (showPassword = false)}>
        {showPassword ? 'hidden' : 'opened'}
      </span>
    </div>
    <div class="strength">
      <span class="bar bar-1" class:bar-show={strength > 0} />
      <span class="bar bar-2" class:bar-show={strength > 1} />
      <span class="bar bar-3" class:bar-show={strength > 2} />
      <span class="bar bar-4" class:bar-show={strength > 3} />
    </div>
    <ul>
      <li>
        {validations[0] ? 'Checked' : 'Not validated'} Must be at least 5
        characters
      </li>
      <li>
        {validations[1] ? 'Checked' : 'Not validated'} Must contain a capital
        letter
      </li>
      <li>
        {validations[2] ? 'Checked' : 'Not validated'} Must contain a number
      </li>
      <li>
        {validations[3] ? 'Checked' : 'Not validated'} Must contain one of
        $&+,;:=?@#
      </li>
    </ul>
  </form>
</main>
<!-- 
	
느낀점

1. 회원가입할 때 비밀번호 암호화를 제대로 했는지 평가하는 것은 Front 기능으로 커버가 가능하다.
2. Emoji를 사용하면 이미지를 사용할 때 보다 이미지 렌더링 시, 용량 소요를 줄일 수 있다.
3. 서버 측에 전가되는 부담을 어떻게하면 최대한 줄일 수 있을까를 고민하면서 프론트 작업을 하면 아주 좋을 것이다.
 -->
