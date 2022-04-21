.PHONY: default
default: run-xcodegen


# 開発環境のセットアップ
init:
	sh scripts/bootstrap.sh
	@make run-xcodegen
	sh scripts/copy_hooks.sh

# xcodegen の実行(プロジェクトファイル生成など)
run-xcodegen:
	mint run xcodegen generate
